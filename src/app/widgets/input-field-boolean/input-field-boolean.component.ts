import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cbp-input-field-boolean',
  templateUrl: './input-field-boolean.component.html',
    styleUrls: ['./input-field-boolean.component.scss']
})
export class InputFieldBooleanComponent implements OnInit {
  list: any;
  @Input() value: any;
  @Input() label: any;
  @Input() icon:any;
  @Input() disabled:boolean;
  @Input() placeholder:any = 'Select Availability';
  @Input() iconColor:any;
  @Input() mandatory: boolean;
  @Output() selected: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {
    this.list = [
      { label: "No", value: false },
      { label: "Yes", value: true },
    ];
  }

  ngOnInit() {
  }

  onSelected() {
    this.selected.emit(this.value);
  }

}
