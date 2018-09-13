import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'cbp-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit {
    @Input() showDialog: boolean;
    @Output() showDialogChange = new EventEmitter();
    @Output() dialogShown = new EventEmitter();

    constructor() {
    }

    ngAfterViewInit(): void {
    }

    ngOnInit() {
    }

    hide() {
        this.showDialog = false;
        this.showDialogChange.emit(this.showDialog);
    }

    show() {
        this.dialogShown.emit();
    }

}
