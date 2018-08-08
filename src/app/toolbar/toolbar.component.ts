import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Cache } from '../utils/storage.provider';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],

})
export class ToolbarComponent implements OnInit {
  @Cache({ pool: 'salesforcePodName' }) salesforcePodName: any;
  @Input() menu: Array<Object>;
  label: string;
  showDialog: boolean = false;
  items: any;

  constructor(private rourter: Router) { }

  ngOnInit() {
    console.log("instance url from toolbar", this.salesforcePodName);
    this.label = this.salesforcePodName.name;
    this.items = [
      {
        label: 'Facebook', url: "https://www.facebook.com/sharer/sharer.php?u=https://chrome.google.com/webstore/detail/salesforce-developer-tool/boadeeihehociaicnjjegenhdbifbllm/"
      },
      {
        label: 'Twitter', url: "https://twitter.com/home?status=https://chrome.google.com/webstore/detail/salesforce-developer-tool/boadeeihehociaicnjjegenhdbifbllm/", 
      },
    ];

  }

  facebook()
  {
    
  }

  openInNewWindow(event) {
    console.log("new window event", event);

    chrome.windows.create({
      url: "index.html",
      type: 'panel',
      width: 1200,
      height: 800,

    },
      function () { });

  }

  go() {
    this.showDialog = true;
  }




}
