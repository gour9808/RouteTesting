import { Component, OnInit, OnDestroy } from '@angular/core';
import { MineLogsService } from '../services/mine-logs.service';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';
import * as  post from '../model/user';
import * as _ from 'lodash';



@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
@AutoUnsubscribe()
export class FlagComponent implements OnInit, OnDestroy {
  loading: boolean;
  fetchLogs$: any = [];
  showDialog: boolean
  config: any[] = [];
  showUserDialog: boolean;
  showClassDialog: boolean;
  showTriggerDialog: boolean;
  filtereUserForUser$: any = [];
  filterUserForClass$: any = [];
  filterUserForTrigger$: any = [];
  filterDebugLevel$: any = [];
  add: post.CreateUser = new post.CreateUser();
  constructor(private mine: MineLogsService) { }

  ngOnInit() {
    this.fetchTraceLogs();
    this.config = [
      { label: 'User', value: 'User' },
      { label: 'Class', value: 'Class' },
      { label: 'Trigger', value: 'Trigger' },
    ];
  }

  ngOnDestroy() { }

  fetchTraceLogs() {
    this.loading = true;
    this.mine.fetchFlags().subscribe(res => {
      console.log("Trace flag data", res);
      this.fetchLogs$ = res.records;
      this.loading = false;
    })
  }

  deleteTraceLogs(event) {
    console.log(event);
    this.mine.deleteParticularTracelag(event.Id).subscribe(res => {
      console.log(res);
      this.fetchTraceLogs();
    })
  }

  setData(event) {
    console.log(event);
    if (event.value === "User") {
      this.showUserDialog = true
    }
    else if (event.value === "Class") {
      this.showClassDialog = true;
    }
    else {
      this.showTriggerDialog = true;
    }
  }

  filterUserDataForUser(event) {
    console.log(event.query);
    this.mine.searchUserForUser(event.query).subscribe(res => {
      console.log(res.records);
      this.filtereUserForUser$ = res.records;
    })
  }

  filterUserDataForClass(event) {
    console.log(event.query);
    this.mine.searchUserForClass(event.query).subscribe(res => {
      console.log(res.records);
      this.filterUserForClass$ = res.records;
    })
  }

  filterUserDataForTrigger(event) {
    console.log(event.query);
    this.mine.searchUserForTrigger(event.query).subscribe(res => {
      console.log(res.records);
      this.filterUserForTrigger$ = res.records;
    })
  }



  setUserIdForUser(event) {
    console.log(event);
    this.add.TracedEntityId = event.Id;
    console.log("USerId", this.add.TracedEntityId);
  }

  setDebugLevelId(event) {
    console.log(event);
    this.add.DebugLevelId = event.Id;
    console.log("debug level ID ", this.add.DebugLevelId);
  }


  filterDebugLevel(event) {
    console.log(event.query);
    this.mine.searchDebugLevel(event.query).subscribe(res => {
      console.log(res.records);
      this.filterDebugLevel$ = res.records;
    })
  }


  createUser() {
    console.log(this.add);
    let date = new Date();
    date.setDate(date.getDate() + 1);
    console.log(new Date(date.toString().split('GMT')[0] + ' UTC').toISOString());
    console.log("tomorrow date", date);
    this.add.ExpirationDate = date;
    this.add.LogType = "DEVELOPER_LOG"
    this.mine.create(this.add).subscribe(res => {
      this.showUserDialog = false;
      console.log(res);
      this.fetchTraceLogs();
    })
  }

  createClass() {
    console.log(this.add);
    let date = new Date();
    date.setDate(date.getDate() + 1);
    console.log(new Date(date.toString().split('GMT')[0] + ' UTC').toISOString());
    console.log("tomorrow date", date);
    this.add.ExpirationDate = date;
    this.add.LogType = "CLASS_TRACING";
    this.mine.create(this.add).subscribe(res => {
      this.showClassDialog = false;
      console.log(res);
      this.fetchTraceLogs();
    })
  }

  createTrigger() {
    console.log(this.add);
    let date = new Date();
    date.setDate(date.getDate() + 1);
    console.log(new Date(date.toString().split('GMT')[0] + ' UTC').toISOString());
    console.log("tomorrow date", date);
    this.add.ExpirationDate = date;
    this.add.LogType = "DEVELOPER_LOG"
    this.mine.create(this.add).subscribe(res => {
      this.showTriggerDialog = false;
      console.log(res);
      this.fetchTraceLogs();
    })
  }

}
