import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'cbp-input-field-options-multiple',
  templateUrl: './input-field-options-multiple.component.html',
    styleUrls: ['./input-field-options-multiple.component.scss']
})
export class InputFieldOptionsMultipleComponent implements OnInit {
  @Input() list: any;
  @Input() label: any;
  @Input() placeH: any;
  @Input() value: any;
  @Input() reset: any;
  @Input() disabled:any;
  @Input() showFilter:any;
  @Input() icon:any;
  @Input() iconColor:any;
  @Input() mandatory: boolean;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reset']) {
      this.value = null;
    }
  }
  onSelected() {
    console.log(this.value);
    this.selected.emit(this.value);
  }
}
