import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';

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


  constructor() {
  }

  ngOnInit() {
    this.config = [
      {label: 'User', value: 'User'},
      {label: 'Class', value: 'Class'},
      {label: 'Trigger', value: 'Trigger'},
  ];
  }


}