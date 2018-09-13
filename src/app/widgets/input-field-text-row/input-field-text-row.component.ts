import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cbp-input-field-text-row',
  templateUrl: './input-field-text-row.component.html',
  styleUrls: ['./input-field-text-row.component.scss']
})
export class InputFieldTextRowComponent implements OnInit {

    @Input() editable = true;
  @Input() label: any;
  @Input() placeholder: any;
  @Input() model: any;
    @Input() error: any;
    @Input() errorMessage: any;
    @Input() maxlength: any;
    @Input() disabled: any;
  @Input() action: any;
    @Input() mandatory: boolean;
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

    onInputChanged() {
    this.modelChange.emit(this.model);
  }

}
