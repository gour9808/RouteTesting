import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cbp-input-field-radio',
  templateUrl: './input-field-radio.component.html',
  styleUrls: ['./input-field-radio.component.scss']
})
export class InputFieldRadioComponent implements OnInit {
  @Input() label: any;
  @Input() radio: any;
  @Input() group: any;
    @Input() disabled: any;
    @Input() checked: boolean;
    @Input() mandatory: boolean;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  radioChecked(event, radio) {
    this.selected.next(radio);
  }


}
