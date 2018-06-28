import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  
})
export class ToolbarComponent implements OnInit {

  @Input() title: String;
  @Output() toggleSidenav = new EventEmitter<any>();
  @ViewChild('popOutButton') elementView: ElementRef;
  showPopout: boolean = false;
  showProfile: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("Init Toolbar");
  }

  toggle() {
    this.toggleSidenav.emit();
  }

  togglePopout() {
    this.showPopout = !this.showPopout;
  }
}
