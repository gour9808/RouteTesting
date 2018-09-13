import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Utils} from "../../utils/utils";

@Component({
    selector: 'cbp-input-field-autocomplete-text',
    templateUrl: './input-field-autocomplete-text.component.html',
    styleUrls: ['./input-field-autocomplete-text.component.scss']
})
export class InputFieldAutocompleteTextComponent implements OnInit {
    results: any;
    @Input() list: any;
    @Input() searchKey: any;
    @Input() displayKey: any;
    @Input() label: any;
    @Input() placeholder: any;
    @Input() mandatory: boolean;
    @Input() model: any;
    @Input() error: any;
    @Input() errorMessage: any;
    @Input() disabled: any;
    @Input() icon: any;
    @Input() iconColor: any;
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    search(event) {
        console.log('Searching for ', event.query);
        this.results = Utils.arrayHasValue(this.list, this.searchKey, event.query);
        console.log('Result is', this.results);
    }

    selected(event) {
        this.modelChange.emit(event);
    }

}
