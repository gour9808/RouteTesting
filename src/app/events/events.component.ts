import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
@AutoUnsubscribe()
export class EventsComponent implements OnInit {

  country$: any = [];
  loading: boolean;
  showDialog: boolean;
  config:any;


  constructor(private books: BooksService) {
  }

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