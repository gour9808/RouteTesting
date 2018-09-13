import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Range {
  min: any;
  max: any;
}

@Component({
  selector: 'cbp-input-field-range',
  templateUrl: './input-field-range.component.html',
  styleUrls: ['./input-field-range.component.scss']
})

export class InputFieldRangeComponent implements OnInit {
  @Input() label: any;
  @Input() placeholder: any;
  @Input() model: Range = {} as any;
  @Input() error: any;
  @Input() errorMessage: any;
  @Input() disabled: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onInputChanged() {
    this.modelChange.emit(this.model);
  }
}
