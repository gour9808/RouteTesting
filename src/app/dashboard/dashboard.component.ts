import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { BooksService } from '../services/books.service';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
@AutoUnsubscribe()
export class DashboardComponent implements OnInit, OnDestroy {

  country$: any = [];
  loading: boolean;

  constructor(private router: Router, private books: BooksService) {
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
