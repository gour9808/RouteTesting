import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Constants } from '../../service/constants';

@Component({
  selector: 'cbp-listcard',
  templateUrl: './listcard.component.html',
  styleUrls: ['./listcard.component.scss']
})
export class ListcardComponent implements OnInit {

  
  @Input() make: any [];

  @Output() delete = new EventEmitter<any>();
 
  constructor() { }

  ngOnInit() {
    // this.makemodel = this.make+ ' ' +this.model;
    // this.name_number = this.name+ ' ' + '(' + this.numberplate + ')';
    console.log('make',this.make)
  }

  getVehicleLogo(make) {
    if (make != null && make != undefined)
      return Constants.GET_VEHICLE_LOGO(make);
  }

  deletefromFleet(){
    this.delete.emit();
  }

}
