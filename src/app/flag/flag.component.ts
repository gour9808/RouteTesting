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
  selected: any;
  users: any
  traceConfigs: any;
  showUserDialog: boolean;
  showClassDialog: boolean;
  showTriggerDialog: boolean;
  filtereUser$: any = [];
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
    })
    this.fetchTraceLogs();

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

  filterUser(event) {
    console.log(event.query);
    this.mine.searchUserForUser(event.query).subscribe(res => {
      console.log(res.records);
      this.filtereUser$ = _.map(res.records, 'Name');
      console.log("filterd one", this.filtereUser$);

    })

  }


  createUser() {
    console.log(this.add);
    this.add.LogType = "DEVELOPER_LOG"
    this.mine.create(this.add).subscribe(res => {
      console.log(res);
    })

  }

  createClass() {
    console.log(this.add);
    this.add.LogType = "CLASS_TRACING";
    this.mine.create(this.add).subscribe(res => {
      console.log(res);
    })
  }

  createTrigger() {
    console.log(this.add);
    this.add.LogType = "DEVELOPER_LOG"
    this.mine.create(this.add).subscribe(res => {
      console.log(res);
    })
  }

}
