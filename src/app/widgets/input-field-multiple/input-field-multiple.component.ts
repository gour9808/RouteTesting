import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cbp-input-field-multiple',
  templateUrl: './input-field-multiple.component.html',
    styleUrls: ['./input-field-multiple.component.scss']
})
export class InputFieldMultipleComponent implements OnInit {
  @Input() label: any;
  @Input() placeholder: any;
  @Input() model: string[];
  @Input() error: boolean;
  @Input() errorMessage: any;
  @Input() icon: any;
  @Input() iconColor: any;
  @Input() mandatory: boolean;
  @Output() modelChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() onAdd: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() onRemove: EventEmitter<string[]> = new EventEmitter<string[]>();

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

  onInputChanged() {
    this.modelChange.emit(this.model);
  }

  check(event) {
    console.log('p chip model change', event);
  }

}
