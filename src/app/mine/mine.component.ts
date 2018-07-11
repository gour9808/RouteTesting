import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { ToastMessageService } from '../services/toast-message.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss']
})
export class MineComponent implements OnInit {
  country$: any = [];
  loading: boolean;
  showDialog: boolean;


  constructor(private books: BooksService, private toast: ToastMessageService) {
  }

  ngOnInit() {
    this.getBooks();
  }


  getBooks() {
    this.loading = true;
    this.books.getBooks().subscribe(res => {
      console.log(res);
      this.loading = false;
      this.country$ = res;
    });
  }
}
