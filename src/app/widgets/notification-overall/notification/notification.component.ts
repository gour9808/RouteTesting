import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cbp-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification : any;
  constructor() { }

  ngOnInit() {
  }

}
