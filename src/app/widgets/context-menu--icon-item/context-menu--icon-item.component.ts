import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'cbp-context-menu--icon-item',
    templateUrl: './context-menu--icon-item.component.html',
    styleUrls: ['./context-menu--icon-item.component.scss']
})
export class ContextMenuIconItemComponent implements OnInit {

    @Input() icon;
    @Input() label;

    constructor() {
    }

    ngOnInit() {
    }

}
