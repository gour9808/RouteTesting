import { Component, OnInit, OnDestroy, ViewContainerRef, Host } from '@angular/core';
import { MineLogsService } from '../services/mine-logs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';
import { saveAs } from 'file-saver';
import { Cache } from '../utils/storage.provider';
import { ToastsManager } from 'ng2-toastr';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
@AutoUnsubscribe()
export class AllComponent implements OnInit, OnDestroy {
  allLogs$: any = [];
  loading: boolean;
  showDialog: boolean;
  selected: any;
  recordId: any;
  i: any;
  data: any;
  @Cache({ pool: 'DeleteAllCached' }) deleteAllCache: boolean;
  @Cache({ pool: 'LogUserId' }) logUserId: any;
  @Cache({ pool: 'LastSeenTime' }) lastSeenTime: any;
  @Cache({ pool: 'NewWindow' }) NewWindow: boolean;
  label: string = "Stop watching"


  constructor(private mineService: MineLogsService,  private toast: ToastsManager, vcr: ViewContainerRef, private router: Router, private route: ActivatedRoute) {
    this.toast.setRootViewContainerRef(vcr)
  }

  ngOnInit() {
    this.choose();
  }

  ngOnDestroy() { }

  getAllLogs() {
    this.loading = true;
    this.mineService.getAllLogs().subscribe(res => {
      console.log("res for all logs", res);
      this.allLogs$ = res.records;
      this.loading = false;
    }, err => {
      this.toast.error(err)
    })
  }

  goToViewPage(event) {
    console.log("on row select", event);
    this.router.navigate(['../details', event.Id], { relativeTo: this.route });
  }


  deleteAllCached() {
    this.deleteAllCache = true;
    this.loading = true;
    this.mineService.deleteAllCached().subscribe(res => {
      console.log(res);
      this.allLogs$ = res.records;
      this.loading = false;
    })
  }


  choose() {
    if (this.deleteAllCache === true) {
      this.deleteAllCached();
    }
    else {
      this.getAllLogs();
      //this.getAllObjects();
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

  goToNewWindow() {
    chrome.windows.create({
      url: "index.html",
      type: 'panel',
      width: 1200,
      height: 800,
    },
      () => {
      });
  }

  handleChange(event) {
    console.log("click", event);
    if (event.checked === true) {
      console.log("hi");
      this.i = setInterval(() => {
        this.choose();
      }, 2000 * 30)
    }
    else {
      clearInterval(this.i);
      this.choose();
    }


  }


}





