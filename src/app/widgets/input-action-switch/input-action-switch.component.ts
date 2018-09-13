import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'cbp-input-action-switch',
  templateUrl: './input-action-switch.component.html',
  styleUrls: ['./input-action-switch.component.scss']
})
export class InputActionSwitchComponent implements OnInit {
  @Input() label: any;
  @Input() isEnabled: boolean;
  @Input() checked: boolean;
  @Output() state: EventEmitter<boolean> = new EventEmitter<boolean>();
  elementId: any;
  constructor() {
    this.elementId = uuid.v1();
  }

  ngOnInit() {
  }

  toggle(event) {
    console.log('Switch ', event);
    this.state.emit(this.checked);
  }

}
