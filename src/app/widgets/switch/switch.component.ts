import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cbp-switch',
  templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss']

})
export class SwitchComponent implements OnInit {
  @Input() model: any;
    @Input() disabled: boolean;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

    value = false;
  constructor() { }

  ngOnInit() {
  }


  selected(event) {
    this.modelChange.emit(this.model);
  }
}
