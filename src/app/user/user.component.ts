import {Component, EventEmitter, OnInit} from '@angular/core';
import {CommunicatorService} from '../common/communicator.service';

@Component({
    selector: 'cbp-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    id: any;
    title: any;
    check: EventEmitter<any>
    menuItems: any = [{
        name: 'HOME',
        icon: 'mdi-home',
        path: 'profile',
        active: true
    }, {
        name: 'My Vehicles',
        icon: 'mdi-car',
        path: 'vehicle',
        query: {type: 'user'},
        active: true
    }
    ];
    public options = {
        position: ['bottom', 'left'],
        timeOut: 2000,
        lastOnBottom: true,
        icons: {success: '', info: ''}
    }
    showSidenav = true;

    constructor(private communicatorService: CommunicatorService) {
    }

    ngOnInit() {
        this.communicatorService.on('update-title', newTitle => {
            setTimeout(() => {
                this.title = newTitle
            })
        })
    }

    toggle() {
        this.showSidenav = !this.showSidenav;
    }


}
