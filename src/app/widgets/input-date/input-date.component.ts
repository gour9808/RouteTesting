import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment'; 

@Component({
  selector: 'cbp-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent implements OnInit {
  @Input() label: any;
  @Input() placeholder: any;
  @Input() model: any;
  @Input() error:any;
  @Input() errorMessage:any;
  @Input() maxlength:any;
  @Input() disabled : any;
  @Input() action: any;
  @Input() mandatory:boolean;
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log("input date",this.model);
    var c = moment(this.model).format('YYYY-MM-DD'); 
    this.model = c;
    console.log("after change",this.model);
  }

  onInputChanged() {
    console.log("date changed",this.model);
    // var c= new Date(this.model);
    // var d = c.getTime();
    // console.log("In milliseconds",d);
    this.modelChange.emit(this.model);
  }

}
