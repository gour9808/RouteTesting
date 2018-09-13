import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {UserService} from '../service/user.service';
import {Cache} from '../utils/storage.provider';
import {InputFieldSearchComponent} from "../widgets/input-field-search/input-field-search.component";
import {LogbookService} from "../service/logbook.service";

@Component({
    selector: 'cbp-playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit, OnDestroy {
    items: Array<any> = _.range(4);
    @Cache({pool: 'User'}) userInfo: any;
    @Cache({pool: 'GroupData'}) groupList: any;
    hide = false;
    user$: any;
    alive = true;
    sub = this;
    menu = [{
        name: 'My Fleets',
        icon: 'mdi-bank',
        path: 'home',
        active: true
    }, {
        name: 'Invitations',
        icon: 'mdi-account-plus',
        path: 'team',
        active: true
    }]
    uS: UserService;
    load: boolean;
    @ViewChild('search') searchBar: InputFieldSearchComponent;
    vehicle = 'Audi A4';
    logs: any = [];

    constructor(private userService: UserService, private logbook: LogbookService) {
        this.uS = this.userService;
    }

    ngOnInit() {
        this.logbook.fetchLogbookEntry('362931e0-7f82-4e3f-9c32-0d3506dc1a6a', 'bd38378d-044a-4a60-90e5-133fb67f7dc7', '1514745000000', '1518437785293')
            .subscribe(res => {
                console.table(res);
                this.logs = res;
            })
    }

    ngOnDestroy() {
        console.log('Destroy on class');
        this.alive = false;
    }

    filterOrganisation() {
        this.uS.fetchUserInfo().subscribe();
    }

    searched(term) {
        console.log('Searched', term);
        this.searchBar.setSearching(false);
    }
}
