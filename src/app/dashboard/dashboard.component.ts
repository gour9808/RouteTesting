import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';
import { CommunicatorService } from '../services/communicator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
@AutoUnsubscribe()
export class DashboardComponent implements OnInit, OnDestroy {
  tabs = [
    { name: 'All', path: 'allLogs', closable:false },
    { name: 'Mine', path: 'logs' , closable: false},
    { name: '', path: 'flag', icon: 'fa fa-flag', closable : false }
  ];
  constructor(private comms: CommunicatorService) {

  }

  ngOnInit() {
    this.comms.on('Add-new-tab', a => {
      console.log("Adding new Tab",a.DebugLevel.DeveloperName);
      this.tabs.push({name: a.DebugLevel.DeveloperName ,path:'', closable : true})
    })
  }

  ngOnDestroy() { }

}
