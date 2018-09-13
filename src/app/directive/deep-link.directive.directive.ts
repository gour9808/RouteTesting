import {Directive, HostListener, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Directive({
    selector: '[cbpDeepLink]'
})
export class DeepLinkDirective implements OnInit {

    @Input() linkType: any;
    @Input() linkId: any;

    constructor(private router: Router) {
    }

    @HostListener('click', ['$event'])
    onClick(event) {
        this.determineType();
        event.preventDefault();
        event.stopPropagation();
    }

    ngOnInit() {
    }

    determineType() {
        switch (this.linkType) {
            case 'VEHICLE':
                console.log('Clicked vehicle', this.linkId);
                this.router.navigate(['/fleet/vehicle/detail/', this.linkId]);
                break;
            case 'DRIVER' :
                console.log('Clicked driver', this.linkId);
                break;
        }
    }
}
