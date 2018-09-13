import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cbp-input-field-number',
  templateUrl: './input-field-number.component.html',
  styleUrls: ['../input-field-text/input-field-text.component.scss']
})
export class InputFieldNumberComponent implements OnInit {

  @Input() label: any;
  @Input() placeholder: any;
  @Input() model: number;
  @Input() icon:any;
  @Input() iconColor:any;
  @Input() mandatory: boolean;
   @Input() disabled: boolean;
  @Input() error: any;
  @Input() errorMessage: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onInputChanged() {
    // var stripped = this.model.replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    // this.model = stripped;
    this.modelChange.emit(this.model);
  }

}
