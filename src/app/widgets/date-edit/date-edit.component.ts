import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment'
@Component({
  selector: 'cbp-date-edit',
  templateUrl: './date-edit.component.html',
  styleUrls: ['./date-edit.component.scss']
})
export class DateEditComponent implements OnInit {
  @Input() model: any;
  @Output() info = new EventEmitter<any>();
  isEdit:boolean ;
  constructor() { }

  ngOnInit() {
    console.log("current date",this.model);
    // this.isEdit = true;
  }

  send(e){
    console.log("event",e)
    console.log("binded date",e.target.valueAsDate)
    this.info.emit(e.target.valueAsDate);
  }
}
