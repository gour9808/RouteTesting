import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'cbp-icon-button-horizontal',
    templateUrl: './icon-button-horizontal.component.html',
    styleUrls: ['./icon-button-horizontal.component.scss']
})
export class IconButtonHorizontalComponent implements OnInit {
    @Input() icon: any;
    @Input() label: any;

    constructor() {
    }

    ngOnInit() {
    }

}
