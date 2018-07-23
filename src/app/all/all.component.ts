import { Component, OnInit, OnDestroy } from '@angular/core';
import { MineLogsService } from '../services/mine-logs.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';
import { saveAs } from 'file-saver';
import { Utils } from '../utils/utils';


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
  data: any

  constructor(private mineService: MineLogsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllLogs();
  }

  ngOnDestroy() { }

  getAllLogs() {
    this.loading = true;
    this.mineService.getAllLogs().subscribe(res => {
      console.log("res for all logs", res);
      this.allLogs$ = res.records;
      this.loading = false;
    })
  }

  goToViewPage(event) {
    // console.log("on row select", event.data);
    // this.router.navigate(['../details', event.data.Id], { relativeTo: this.route });
  }


  deleteAllCached() {
    this.mineService.deleteAllCached().subscribe(res => {
      console.log(res);

    })
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
}

