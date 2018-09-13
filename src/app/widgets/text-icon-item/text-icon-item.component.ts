import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'cbp-text-icon-item',
    templateUrl: './text-icon-item.component.html',
    styleUrls: ['./text-icon-item.component.scss']
})
export class TextIconItemComponent implements OnInit {
    @Input() icon: any;
    @Input() label: any;
    @Input() value: any;
    @Input() color: any;
    @Input() trim: any;
    @Input() size: any;
    @Input() mandatory: boolean;
    @Input() class: any;

    constructor() {
    }

    ngOnInit() {
    }

}
