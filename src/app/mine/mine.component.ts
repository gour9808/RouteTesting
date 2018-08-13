import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastMessageService } from '../services/toast-message.service';
import { MineLogsService } from '../services/mine-logs.service';
import { Cache } from '../utils/storage.provider';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';
import { saveAs } from 'file-saver';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss']
})
@AutoUnsubscribe()
export class MineComponent implements OnInit, OnDestroy {
  mineLogs$: any = [];
  label: string = "Stop watching"
  selected: any;
  data: any;
  recordId: any;
  i: any;
  loading: boolean;
  showDialog: boolean;
  colors: any;
  selectedCar: any;

  displayDialog: boolean;

  sortOptions: any[];

  sortKey: string;

  sortField: string;

  sortOrder: number;
  @Cache({ pool: 'LogUserId' }) logUserId: any;
  @Cache({ pool: 'LastSeenTime' }) lastSeenTime: any;
  @Cache({ pool: 'DeleteMineCached' }) deleteMyCache: boolean;
  @Cache({ pool: 'instance' }) instanceUrl: any;



  constructor(private mineService: MineLogsService, private route: ActivatedRoute, private router: Router,
    private toast: ToastMessageService) {
  }

  ngOnInit() {
    this.sortOptions = [
      { label: 'Newest First', value: '!year' },
      { label: 'Oldest First', value: 'year' },
      { label: 'Brand', value: 'brand' }
    ];
    this.choose();
  }

  ngOnDestroy() { }


  getMineLogs() {
    this.loading = true;
    this.mineService.getMineLogs(this.logUserId.userId).subscribe(res => {
      console.log("mine logs", res.records[0].StartTime);
      this.lastSeenTime = res.records[0].StartTime
      this.mineLogs$ = res.records;
      this.loading = false;
    })
  }

  goToViewPage(event) {
    console.log("on row select", event);
    this.router.navigate(['../details', event.Id], { relativeTo: this.route });
  }

  deleteMineCached() {
    this.deleteMyCache = true;
    this.loading = true;
    this.mineService.deleteMineCached().subscribe(res => {
      console.log(res);
      this.mineLogs$ = res.records;
      this.loading = false;
    })
  }

  choose() {
    if (this.deleteMyCache === true) {
      this.deleteMineCached();
    }
    else {
      this.getMineLogs();
    }
  }


  downloadLogs(event) {
    console.log("log Id is", event.Id);
    this.recordId = event.Id;
    let title = "apex - " + event.Id
    this.mineService.downloadLogs(this.recordId).subscribe(res => {
      console.log(res);

    }, err => {
      console.log(err.error.text);
      this.data = err.error.text;
      this.saveToFileSystem(this.data)
    })
  }

  saveToFileSystem(response) {
    const filename = "Apex- " + this.recordId;
    const blob = new Blob([response], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  }

  goToNewWindow(event) {
    console.log(event);

    chrome.windows.create({
      url: "index.html",
      type: 'panel',
      width: 1200,
      height: 800,

    },
      function () { });
  }

  goToNewTab(event) {
    console.log(event);
    chrome.tabs.create({
      url: "/home/my/details/" + event.Id + '&instanceUrl=' + this.instanceUrl.currentURL,
      selected: true
    }, () => { })

  }

  handleChange(event) {
    console.log("click", event);
    if (event.checked === true) {
      this.i = setInterval(() => {
        this.choose();
      }, 2000 * 30)
    }
    else {
      clearInterval(this.i);
      this.choose();
    }
  }

  selectCar(event, mine) {
    console.log(event, mine);
    this.selectedCar = mine;
    this.displayDialog = true;
    event.preventDefault();
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onDialogHide() {
    this.selectedCar = null;
  }
}
