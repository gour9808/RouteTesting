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
  fromRangeDates: Date[];
  toRangeDates: Date[];


  constructor(private events: EventsService, private mineService: MineLogsService) {
  }

  ngOnInit() {
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
    this.mineService.downloadLogs(this.recordId).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err.error.text);
      this.data = err.error.text;
      this.saveToFileSystem(this.data)
    })
  }

  saveToFileSystem(response) {
    const filename = "LogFile";
    const blob = new Blob([response], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  }

  fromDateValues(event) {
    console.log(event);

  }

  toDateValues(event) {
    console.log(event);

  }

  fetchFilteredData() {

  }
}