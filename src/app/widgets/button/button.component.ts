import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'cbp-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
    @Input() label;
    @Input() disabled;

    constructor() {
    }

    ngOnInit() {
    }

}
