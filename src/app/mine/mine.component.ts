import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
  country$: any = [];
  loading: boolean;

  constructor(private books: BooksService) {
    
  }

  ngOnInit() {
    this.getBooks();
  }

  ngOnDestroy() { }

  getBooks() {
    this.loading = true;
    this.books.getBooks().subscribe(res => {
      console.log(res);
      this.loading = false;
      this.country$ = res;

    })
  }
}
