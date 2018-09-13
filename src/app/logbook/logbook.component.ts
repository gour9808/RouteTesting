import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FleetService } from '../service/fleet.service';
import * as moment from 'moment';
import { LogbookService } from '../service/logbook.service';
import { CommunicatorService } from '../common/communicator.service';
import { ToastMessageService } from '../service/toast-message.service';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';

@Component({
  selector: 'cbp-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.scss']
})

@AutoUnsubscribe()
export class LogbookComponent implements OnInit, AfterViewInit, OnDestroy {
  logbook$;
  logbbokDate$;

  totalDistance: string;
  @ViewChild('flexCard') elementView: ElementRef;
  viewHeight: any;
  logs: any[] = [];
  temp: any[] = [];
  loadingLogs = true;
  try = null;
  emptyMessage: string;
  startDate: any;
  endDate: any;

  selectedTrip: any;
  display = false;
  tripImageUrl: String;
  startOdo: number;
  endOdo: number;

  images: any[];


  constructor(private fleetService: FleetService, private toastMsg: ToastMessageService, private logbookservice: LogbookService, private communicatorService: CommunicatorService) {
  }

  ngOnInit() {
    this.getLogbook();
    this.try = null;
    const log = 'Logbook';
    this.communicatorService.broadcast('update-title', 'LOGBOOK');
  }

  ngOnDestroy() { }

  ngAfterViewInit() {
    this.viewHeight = this.elementView.nativeElement.offsetHeight - 84 + 'px';
    console.log('Element height', this.viewHeight);
  }


  getLogbook() {
    this.logbook$ = this.logbookservice.fetchLogbookForUser().subscribe(res => {
      this.logs = res;
      // console.log("logs",res);
      console.log(this.logs.length);
      const c = 0;
      if (c) {
        this.emptyMessage = '';
      } else {
        this.emptyMessage = 'No records found';
      }
      this.calculateDistance(this.logs);
      this.getTimeDiff();
    }, err => {
      this.toastMsg.showError("ERROR", "NO_LOGBOOK_FOUND");
      console.log('Error in getting Logbook');
      console.log(err);
      this.loadingLogs = false;
    });
  }


  showDialog(event) {
    console.log(event.data);
    this.tripImageUrl = '';
    this.display = true;
    this.tripImageUrl = event.data.pictureURL;
    this.startOdo = event.data.startMileage;
    this.endOdo = event.data.endMileage
  }


  calculateDistance(logs) {
    let distance = 0;
    logs.forEach(log => {
      distance += log.distance;
    });
    console.log('Distance is', distance);
    this.totalDistance = '' + distance + ' Kms';
  }

  getTimeDiff() {
    this.logs.forEach(log => {
      const start = moment(log.startTime);
      const end = moment(log.endTime);
      const duration = moment.duration(end.diff(start));// .format("h[h] m[m] s[s]");
      log.duration = duration.humanize();
    });
    console.log('Logbook is', this.logs);
    this.loadingLogs = false;
  }

  match(e) {
    console.log('startDate', this.startDate);
    console.log('endDate', this.endDate);
    const v = new Date(this.startDate);
    // var start = moment.utc(v);
    const start = v.getTime();
    const u = new Date(this.endDate);
    const end = u.getTime();
    console.log('start', start);
    console.log('end', end);
    this.logbbokDate$ = this.logbookservice.fetchLogbookForDateRange(start, end).subscribe(res => {
      console.log('date range res', res);
      this.logs = res;
      const c = 0;
      if (c) {
        this.emptyMessage = '';
      } else {
        this.emptyMessage = 'No records found';
      }
      this.calculateDistance(this.logs);
      this.getTimeDiff();

    }, error => {
      this.toastMsg.showError("ERROR", "ERROR_FETCHING_LOGBOOK_FOR_GIVEN_RANGE");
    });
    console.log('Logs', this.logs);
  }

}

