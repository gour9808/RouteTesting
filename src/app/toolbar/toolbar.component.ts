import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],

})
export class ToolbarComponent implements OnInit {

  @Input() menu: Array<Object>;
  
  constructor() { }

  ngOnInit() {
  }

  openInNewWindow(event) {
    console.log("new window event",event);
    
    chrome.windows.create({
      url: "index.html",
      type: 'panel',
      width: 1200,
      height: 800,

    },
      function () { });

  }


  

}
