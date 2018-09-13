import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'cbp-input-field-chips',
  templateUrl: './input-field-chips.component.html',
  styleUrls: ['./input-field-chips.component.scss']
})
export class InputFieldChipsComponent implements OnInit {
  @Input() label: any;
  @Input() placeholder: any;
  @Input() model: string[] = [];
  @Input() maxItems:number;
  @Input() error: boolean;
  @Input() errorMessage: any;
  @Input() icon: any;
  @Input() disabled: any;
  @Input() iconColor: any;
  @Input() mandatory: boolean;
  @Output() onAdd: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemove: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() onBlur: EventEmitter<string[]> = new EventEmitter<string[]>();

  items: string[] = new Array<string>();

  constructor() { }

  ngOnInit() {
  }

  add(event) {
    this.onAdd.emit(event);
  }

  remove(event) {
    this.onRemove.emit(event);
  }

  check(event) {
    console.log('p chip model change', event);
  }

}
