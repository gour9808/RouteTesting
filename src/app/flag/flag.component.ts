import { Component, OnInit, OnDestroy } from '@angular/core';
import { MineLogsService } from '../services/mine-logs.service';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
@AutoUnsubscribe()
export class FlagComponent implements OnInit, OnDestroy {
  loading: boolean;
  fetchLogs$: any = [];
  showDialog: boolean;
  config: any[] = [];
  selected: any;

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
      this.fetchLogs$ = res;
      this.loading = false;
    })
  }

  deleteTraceLogs(event) {
    console.log(event);

  }

}
