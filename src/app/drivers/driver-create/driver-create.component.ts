import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { } from '../../models/drivers';

@Component({
  selector: 'cbp-driver-create',
  templateUrl: './driver-create.component.html',
  styleUrls: ['./driver-create.component.scss']
})
export class DriverCreateComponent implements OnInit {
@Output() createDriver = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  create(event){
    console.log("create driver",event)
    // this.createDriver.emit();

  }
}
