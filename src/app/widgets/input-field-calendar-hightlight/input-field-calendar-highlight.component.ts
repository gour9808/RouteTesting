import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';
import {CommunicatorService} from '../../common/communicator.service';

@Component({
    selector: 'cbp-input-field-calendar-highlight',
    templateUrl: './input-field-calendar-highlight.component.html',
    styleUrls: ['./input-field-calendar-highlight.component.scss']
})
export class InputFieldCalendarHighlightComponent implements OnInit {
    @Input() model: Date;
    @Input() showTime: boolean;
    @Input() minDate: any;
    @Input() maxDate: any;
    @Input() disabled: any;
    @Input() yearRange: any = '2017:2020';
    @Input() mandatory: boolean;
    @Input() dateFormat: any = 'dd M yy';
    @Input() inline: boolean;
    @Input() dueDates: any;
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    events: any[] = [];

    constructor(private comms: CommunicatorService) {
        this.comms.on('dueDates', (res) => {
            this.dueDates = res;
            this.loadEvents();
        });
    }

    ngOnInit() {
        this.loadEvents();
    }

    loadEvents() {
        if (this.dueDates) {
            this.events = [];
            this.dueDates.forEach(day => {
                day = new Date(day);
                this.events.push({date: day.getDate(), month: day.getMonth(), year: day.getFullYear()});
            });
        }
    }

    checkDay(date) {
        if (_.find(this.events, {'month': date.month, 'date': date.day, 'year': date.year})) {
            return true;
        }
    }

    selected(event) {
        this.modelChange.emit(this.model);
    }
}
