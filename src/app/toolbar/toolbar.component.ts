import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  
})
export class ToolbarComponent implements OnInit {

 
  menuItems = [{
    name: "Debug",
    icon: "fa-dashboard",
    path: "/home/my",
    active: true
  },

  {
    name: "Events",
    icon: "fa-line-chart",
    path: "/home/events/all",
    active: true
  },
  {
    name: "Discussions",
    icon: "fa-users",
    path: "/home/discussions/all",
    active: true,

  },
  ];


  constructor() { }

  ngOnInit() {
    console.log("Init Sidebar");
    console.log(this.menuItems);

  }


}
