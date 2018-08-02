import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from '../utils/auto-unsubscribe';
import { MineLogsService } from '../services/mine-logs.service';
import { saveAs } from 'file-saver';
import { EventsService } from '../services/events.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})

@AutoUnsubscribe()
export class EventsComponent implements OnInit, OnDestroy {

  events$: any = [];
  loading: boolean;
  showDialog: boolean;
  config: any;
  recordId: string;
  data: any;
  fromRangeDates: any;
  toRangeDates: any;
  from: boolean;
  to: boolean;
  event: boolean = false;
  eventType: string;

  constructor(private events: EventsService, private mineService: MineLogsService) {
  }

  ngOnInit() {

    this.fromRangeDates = new Date();
    this.fromRangeDates.setDate(this.fromRangeDates.getDate() - 15);
    this.toRangeDates = new Date();
    this.toRangeDates.setDate(this.toRangeDates.getDate());

    this.fetchEventsData();
    this.config = [
      { label: 'All', value: 'All' },
      { label: 'API', value: 'API' },
      { label: 'ApexCallout', value: 'ApexCallout' },
      { label: 'ApexExecution', value: 'ApexExecution' },
      { label: 'ApexSoap', value: 'ApexSoap' },
      { label: 'ApexTrigger', value: 'ApexTrigger' },
      { label: 'AsyncReportRun', value: 'AsyncReportRun' },
      { label: 'BulkApi', value: 'BulkApi' },
      { label: 'ChangeSetOperation', value: 'ChangeSetOperation' },
      { label: 'ContentDistribution', value: 'ContentDistribution' },
      { label: 'ContentDocumentLink', value: 'ContentDocumentLink' },
      { label: 'ContentTransfer', value: 'ContentTransfer' },
      { label: 'Dashboard', value: 'Dashboard' },
      { label: 'DocumentAttachmentDownloads', value: 'DocumentAttachmentDownloads' },
      { label: 'Login', value: 'Login' },
      { label: 'LoginAs', value: 'LoginAs' },
      { label: 'Logout', value: 'Logout' },
      { label: 'MetadataApiOperation', value: 'MetadataApiOperation' },
      { label: 'MultiBlockReport', value: 'MultiBlockReport' },
      { label: 'PackageInstall', value: 'PackageInstall' },
      { label: 'Report', value: 'Report' },
      { label: 'ReportExport', value: 'ApexCallout' },
      { label: 'Sandbox', value: 'Sandbox' },
      { label: 'Sites', value: 'Sites' },
      { label: 'TimeBasedWorkflow', value: 'TimeBasedWorkflow' },
      { label: 'UITracking', value: 'UITracking' },
      { label: 'URI', value: 'URI' },
      { label: 'VisualforceRequest', value: 'VisualforceRequest' },
    ];
  }

  ngOnDestroy() { }

  fetchEventsData() {
    this.loading = true;
    this.events.fetchEventData().subscribe(res => {
      console.log(res);
      this.events$ = res.records;
      this.loading = false;
    })
  }


  downloadLogs(event) {
    console.log("log Id is", event.Id);
    this.recordId = event.Id;
    let title = "apex - " + event.Id
    this.events.downloadEventLogs(this.recordId).subscribe(res => {
      console.log(res);
    })
  }

  saveToFileSystem(response) {
    const filename = "LogFile";
    const blob = new Blob([response], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  }

  fromDateValues(event) {
    console.log("from date", event);
    this.fromRangeDates = new Date(event).toISOString();
    this.from = true;
    console.log("iso string", this.fromRangeDates);
  }

  toDateValues(event) {
    console.log("to date", event);
    this.toRangeDates = new Date(event).toISOString();
    this.to = true;
    console.log(this.toRangeDates);
  }

  setEventType(event) {
    console.log("event type", event);
    this.event = true;
    this.eventType = event.value;
  }

  fetchFilteredDataForEvent() {
    this.loading = true;
    this.events.fetchFilteredDataForEventType(this.eventType).subscribe(res => {
      console.log(res);
      this.events$ = res.records;
      this.loading = false;
    })
  }

  fetchFilteredDataForDate() {
    this.loading = true;
    this.events.fetchFilteredDataForDate(this.fromRangeDates, this.toRangeDates).subscribe(res => {
      console.log(res);
      this.events$ = res.records;
      this.loading = false;
    })
  }

  fetchFilteredDataForDateAndEvent() {
    this.loading = true;
    this.events.fetchFilteredDataForEventTypeAndDate(this.fromRangeDates, this.toRangeDates, this.eventType).subscribe(res => {
      console.log(res);
      this.events$ = res.records;
      this.loading = false;
    })
  }

  choose() {
    if (this.from === true && this.to === true && this.event === false) {
      this.fetchFilteredDataForDate();
    }
    else if (this.event === true) {
      this.fetchFilteredDataForEvent();
    }
    else {
      this.fetchFilteredDataForDateAndEvent();
    }
  }
}