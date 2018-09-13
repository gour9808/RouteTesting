import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cbp-calendar',
  templateUrl: './calendar-dialog.component.html',
    styleUrls: ['./calendar-dialog.component.scss']
})
export class CalendarDialogComponent implements OnInit {
  value: any;
  @Input() minDate: any;
  @Output() dateSelected: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

    selected(event) {
    this.dateSelected.emit(this.value)
  }

}
