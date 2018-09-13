import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cbp-input-field-radio-group',
  templateUrl: './input-field-radio-group.component.html',
  styleUrls: ['./input-field-radio-group.component.scss']
})
export class InputFieldRadioGroupComponent implements OnInit {
  @Input() label: any;
  @Input() radios: any;
  @Input() group: any;
  @Input() disabled: any;
  @Input() checked: any;
  @Input() icon: any;
  @Input() iconColor: any;
  @Input() mandatory: boolean;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  radioChecked(event) {
    this.selected.next(event);
  }


}
