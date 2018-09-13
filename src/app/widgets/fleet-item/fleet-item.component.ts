import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'cbp-fleet-item',
    templateUrl: './fleet-item.component.html',
    styleUrls: ['./fleet-item.component.scss']
})
export class FleetItemComponent implements OnInit {
    @Input() label: any;
    @Input() icon: any;
    @Input() class: any;
    @Input() path: any;
    @Input() query: any;
    @Input() img: string;
    @Input() haveMdi = false;
    @Input() subLabel: any;
    @Input() count: any = 0;

    constructor() {
    }

    ngOnInit() {
    }

    getCapitalize(item) {
        return _.startCase(_.toLower(item.charAt(0)));
    }

}
