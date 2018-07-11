import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent implements OnInit {
  country$: any = [];
  loading: boolean;
  showDialog: boolean;
  config: any[] = [];
  selected: any;

  constructor(private books: BooksService) { }

  ngOnInit() {
    this.config = [
      {label: 'User', value: 'User'},
      {label: 'Class', value: 'Class'},
      {label: 'Trigger', value: 'Trigger'},
  ];
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
