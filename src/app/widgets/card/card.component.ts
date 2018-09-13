import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
    selector: 'cbp-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
    @Input() label;
    @Input() showExpansion;
    @Input() expanded = true;
    @Input() showBack: boolean;
    @Input() searching: boolean;
    @Input() showHeader = true;
    @Output() onBackPressed = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

    back() {
        this.onBackPressed.emit();
    }
}
