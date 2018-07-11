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
  cities: any[];
  selectedCity: any;


  constructor(private books: BooksService) {
    this.cities = [
      {name: 'user', code: 'RM'},
      {name: 'class', code: 'LDN'},
      {name: 'Trigger', code: 'IST'}
  ];

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
