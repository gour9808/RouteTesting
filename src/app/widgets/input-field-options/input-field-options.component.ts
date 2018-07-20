import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-input-field-options',
  templateUrl: './input-field-options.component.html',
  styleUrls: ['./input-field-options.component.scss']
})
export class InputFieldOptionsComponent implements OnInit {
  @Input() list: any;
  @Input() label: any;
  @Input() placeH: any;
  @Input() value: any;
  @Input() reset: any;
  @Input() disabled: any;
  @Input() showFilter: any;
  @Input() filter: any;
  @Input() icon: any;
  @Input() iconColor: any;
  @Input() mandatory: boolean;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  key: any;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reset']) {
      this.value = null;
    }
  }

  modelChange(event) {
    this.value = event;
  }

  onSelected() {
    console.log(this.value);
    this.selected.emit(this.value);
  }

}
