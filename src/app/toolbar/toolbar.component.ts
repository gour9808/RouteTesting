import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],

})
export class ToolbarComponent implements OnInit {

  @Input() menu: Array<Object>;

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
    this.getMenuName();

  }

  getMenuName() {
    console.log(this.menuItems);
    _.map(this.menuItems, (value) => {
      console.log(value.name);
    });

  }


}
