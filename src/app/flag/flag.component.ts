import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { MineLogsService } from '../services/mine-logs.service';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';
import * as  post from '../model/user';
import * as _ from 'lodash';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Cache } from '../utils/storage.provider';


@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
@AutoUnsubscribe()
export class FlagComponent implements OnInit, OnDestroy {
  loading: boolean;
  @Cache({ pool: 'NewWindow' }) NewWindow: boolean;
  showDialogForNewWindow: boolean;
  userName: string;
  devName: string;
  fetchLogs$: any = [];
  showDialog: boolean
  config: any[] = [];
  selected: any;
  showUserDialog: boolean;
  showClassDialog: boolean;
  showTriggerDialog: boolean;
  filtereUserForUser$: any = [];
  filterUserForClass$: any = [];
  filterUserForTrigger$: any = [];
  filterDebugLevel$: any = [];
  deleteConfirmDialog: boolean;
  emptyMessage: string;
  add: post.CreateUser = new post.CreateUser();
  remove: post.clearUsername = new post.clearUsername();
  constructor(private mine: MineLogsService, private toast: ToastsManager, private vcr: ViewContainerRef) {
    this.toast.setRootViewContainerRef(vcr)
  }

  ngOnInit() {
    this.NewWindow = false;
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
    }, err => {
      this.toast.error("Error in fetching Logs")
    })
  }

  deleteTraceLogs(event) {
    console.log(event);
    this.mine.deleteParticularTracelag(event.Id).subscribe(res => {
      console.log(res);
      this.toast.success("Deleted Successfully");
      this.fetchTraceLogs();
    }, err => {
      this.toast.error("Error deleting log", err)
    })
  }

  setData(event) {
    console.log(event);
    if (event.value === "User") {
      this.showUserDialog = true;

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
      if (res.records.length === 0) {
        this.emptyMessage = "No records found"
      }
      this.filtereUserForUser$ = res.records;
    })
  }

  filterUserDataForClass(event) {
    console.log(event.query);
    this.mine.searchUserForClass(event.query).subscribe(res => {
      console.log(res.records);
      if (res.records.length === 0) {
        this.emptyMessage = "No records found"
      }
      this.filterUserForClass$ = res.records;
    })
  }

  filterUserDataForTrigger(event) {
    console.log(event.query);
    this.mine.searchUserForTrigger(event.query).subscribe(res => {
      console.log(res.records);
      if (res.records.length === 0) {
        this.emptyMessage = "No records found"
      }
      this.filterUserForTrigger$ = res.records;
    })
  }


  setUserIdForUser(event) {
    console.log(event);
    this.add.TracedEntityId = event.Id;
    this.userName = event.Name;
    console.log("USerId", this.add.TracedEntityId);
    console.log(this.userName);

  }

  setDebugLevelId(event) {
    console.log(event);
    this.add.DebugLevelId = event.Id;
    this.devName = event.DeveloperName;
    console.log("debug level ID ", this.add.DebugLevelId);
  }


  filterDebugLevel(event) {
    console.log(event.query);
    this.mine.searchDebugLevel(event.query).subscribe(res => {
      console.log(res.records);
      if (res.records.length === 0) {
        this.emptyMessage = "No records found"
      }
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
      this.toast.success("Success");
      console.log(res);
      this.fetchTraceLogs();
    },
      err => {
        console.log(err.error[0].message);
        this.toast.error("error", err.error[0].message)
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
      this.toast.success("Success");
      console.log(res);
      this.fetchTraceLogs();
    }, err => {
      console.log(err.error[0].message);
      this.toast.error("error", err.error[0].message)
    })
  }

  createTrigger() {
    console.log(this.add);
    let date = new Date();
    date.setDate(date.getDate() + 1);
    console.log(new Date(date.toString().split('GMT')[0] + ' UTC').toISOString());
    console.log("tomorrow date", date);
    this.add.ExpirationDate = date;
    this.add.LogType = "CLASS_TRACING"
    this.mine.create(this.add).subscribe(res => {
      this.showTriggerDialog = false;
      this.toast.success("Success");
      console.log(res);
      this.fetchTraceLogs();
    }, err => {
      console.log(err.error[0].message);
      this.toast.error("error", err.error[0].message)
    })
  }

  goForIgnition() {
    return this.add.TracedEntityId && this.add.DebugLevelId;
  }

  goToNewWindow() {
    chrome.windows.create({
      url: "index.html",
      type: 'panel',
      width: 1200,
      height: 800,

    })
    if (this.showDialog === false) {
      this.NewWindow = true;
    }
    else {
      this.NewWindow = false;
    }

  }

  checkTrueOrFalse() {
    this.showDialog = false;
  }


}
