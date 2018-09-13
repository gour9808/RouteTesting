import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'cbp-input-field-calendar-range',
    templateUrl: './input-field-calendar-range.component.html',
    styleUrls: ['./input-field-calendar-range.component.scss']
})
export class InputFieldCalendarRangeComponent implements OnInit {
    @Input() model: Date[];
    @Input() title: any;
    @Input() showTime: boolean;
    @Input() placeholder: any = 'Set Date Range';
    @Input() minDate: any;
    @Input() maxDate: any;
    @Input() disabled: any;
    @Input() yearRange: any = '2017:2020';
    @Input() icon: any;
    @Input() iconColor: any;
    @Input() mandatory: boolean;
    @Input() dateFormat: any = 'dd M yy';
    @Input() timeOnly: boolean;
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    selected(event) {
        this.modelChange.emit(this.model);
    }
}
