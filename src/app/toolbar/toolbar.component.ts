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
    console.log("Init Sidebar");
  }

}
