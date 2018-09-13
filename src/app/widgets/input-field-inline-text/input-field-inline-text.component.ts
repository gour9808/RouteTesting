import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cbp-input-field-inline-text',
  templateUrl: './input-field-inline-text.component.html',
  styleUrls: ['./input-field-inline-text.component.scss']
})
export class InputFieldInlineTextComponent implements OnInit {
  @Input() label: any;
  @Input() placeholder: any = '';
  @Input() type:any;
  @Input() model: any;
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
