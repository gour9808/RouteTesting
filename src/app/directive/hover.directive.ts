import {Directive, EventEmitter, HostListener, Output} from '@angular/core';


@Directive({selector: '[onHover]'})
export class HoverDirective {
    @Output() onHover: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    @HostListener('mouseenter')
    mouseover() {
        this.onHover.emit(true);
    }

    @HostListener('mouseleave')
    mouseout() {
        this.onHover.emit(false);
    }
}
