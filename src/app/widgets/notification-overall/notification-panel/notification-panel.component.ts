import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cbp-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.scss']
})
export class NotificationPanelComponent implements OnInit {
  @Input() notifications: any[];
  @Output() openparent = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.openparent.emit();
  }

}
