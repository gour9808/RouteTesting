import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
@AutoUnsubscribe()
export class DashboardComponent implements OnInit, OnDestroy {
  tabs = [
    { name: 'All', path: 'allLogs' },
    { name: 'Mine', path: 'logs' },
    { name: 'Flag', path: 'flag' }
  ];
  constructor() {
    
  }

  ngOnInit() {
  }

  ngOnDestroy() { }

}
