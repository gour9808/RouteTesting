import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'cbp-input-field-text',
    templateUrl: './input-field-text.component.html',
    styleUrls: ['./input-field-text.component.scss']
})
export class InputFieldTextComponent implements OnInit {
    @Input() label: any;
    @Input() placeholder: any = '';
    @Input() model: any;
    @Input() error: any;
    @Input() errorMessage: any;
    @Input() disabled: any;
    @Input() readonly: any;
    @Input() icon: any;
    @Input() iconColor: any;
    @Input() mandatory: boolean;
    @Input() maxlength: number;
    @Input() keyFilter: any = /^[\w\-\s]+$/;
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() onBlured: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    onInputChanged() {
        this.modelChange.emit(this.model);
    }

    onBlur() {
        this.onBlured.emit(this.model);
    }
}
