import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'cbp-fleet-resolver',
    templateUrl: './fleet-resolver.component.html',
    styleUrls: ['./fleet-resolver.component.scss']
})

export class FleetResolverComponent implements OnInit {

    menu = [{
        name: 'MY_FLEETS',
        icon: 'mdi-bank',
        path: 'fleets',
        active: true
    }, {
        name: 'INVITATIONS',
        icon: 'mdi-account-plus',
        path: 'invites',
        active: true
    }];

    constructor() {

    }

    ngOnInit() {
    }
}
