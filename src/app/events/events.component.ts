import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';
import { MineLogsService } from '../services/mine-logs.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
@AutoUnsubscribe()
export class EventsComponent implements OnInit {

  events$: any = [];
  loading: boolean;
  showDialog: boolean;
  config: any;


  constructor(private mineService: MineLogsService) {
  }

  ngOnInit() {
    this.fetchEventsData();
    this.config = [
      { label: 'User', value: 'User' },
      { label: 'Class', value: 'Class' },
      { label: 'Trigger', value: 'Trigger' },
    ];
  }

  fetchEventsData() {
    this.mineService.fetchEventData().subscribe(res => {
      console.log(res);
      this.events$ = res.records;
    })
  }


}