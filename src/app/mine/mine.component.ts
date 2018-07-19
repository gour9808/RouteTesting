import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastMessageService } from '../services/toast-message.service';
import { MineLogsService } from '../services/mine-logs.service';
import { Cache } from '../utils/storage.provider';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';
import { Constants } from '../services/constants';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss']
})
@AutoUnsubscribe()
export class MineComponent implements OnInit, OnDestroy {
  mineLogs$: any = [];
  selected: any;
  loading: boolean;
  showDialog: boolean;
  @Cache({ pool: 'LogUserId' }) logUserId: any


  constructor(private mineService: MineLogsService, private route: ActivatedRoute, private router: Router,
    private toast: ToastMessageService) {
  }

  ngOnInit() {
    this.getMineLogs();
  }

  ngOnDestroy() { }


  getMineLogs() {
    this.loading = true;
    this.mineService.getMineLogs(this.logUserId.userId).subscribe(res => {
      console.log("mine logs", res.records);
      this.mineLogs$ = res.records;
      this.loading = false;
    })
    //  this.deleteMineCached();
  }

  goToViewPage(event) {
    console.log("on row select", event.data);
    this.router.navigate(['../details', event.data.Id], { relativeTo: this.route });
  }

  deleteMineCached() {
    this.mineService.deleteMineCached().subscribe(res => {
      console.log(res);
    })
  }

  downloadLogs(event) {
    console.log(event);

    //  this.mineService.downloadLogs().subscribe


  }


}
