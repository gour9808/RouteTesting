import {CommunicatorService} from '../../common/communicator.service';
import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Params, Router} from '@angular/router';
import {Cache} from '../../utils/storage.provider';
import {TranslateService} from '@ngx-translate/core';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {ToolbarTitleService} from '../../service/toolbar-title.service';

interface IBreadcrumb {
    label: string;
    params: Params;
    url: string;
}

@Component({
    selector: 'cbp-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})

@AutoUnsubscribe()
export class ToolbarComponent implements OnInit, OnDestroy {
    @Cache({pool: 'lang'}) lang;
    @Cache({pool: 'User'}) userInfo: any;
    @Cache({pool: 'Fleets'}) fleets: any;
    breadcrumbs: any;
    titleSub$;
    routerSub$;
    title: String;
    @Output() toggleSidenav = new EventEmitter<any>();
    @ViewChild('popOutButton') elementView: ElementRef;
    showPopout: boolean;
    showFleet: boolean;
    showProfile: boolean;
    notif: boolean;
    public languages: any[];
    public expanded: boolean;
    showNotif: boolean;
    isFleet: string | any;
    titleService$: any;

    constructor(private router: Router, private translateService: TranslateService, private route: ActivatedRoute,
                private comms: CommunicatorService, private toolbarTitleService: ToolbarTitleService) {

        // following are the languages to which the website can be translated into
        this.languages = [
            {
                name: 'English',
                value: 'lang-en',
                icon: 'flag-icon flag-icon-en',
                active: false,
            },
            {
                name: 'Deutsch',
                value: 'lang-de',
                icon: 'flag-icon flag-icon-de',
                active: false,
            }];
        this.subscribeToTitleChange();

        this.titleService$ = this.toolbarTitleService.onTitleChange().subscribe(title => {
            console.log('Title is', title ? title : 'No title');
            if (title) {
                this.title = title;
            }
        })
    }

    get currentCountryValue(): string {
        return this.translateService.currentLang;
    }

    ngOnInit() {
        this.isFleet = localStorage.getItem('fleetID');
        console.log('Init Toolbar');
        console.log('Fleets are', this.fleets);
        this.translateService.setDefaultLang('lang-en'); // set English as default
        // set current langage
        console.log('language locally stored', this.lang);
        this.lang = this.lang ? this.lang : 'lang-en';
        this.selectLang(this.lang);
        console.log('Route is', this.router.url);
    }

    ngOnDestroy() {
    }

    toggle() {
        this.toggleSidenav.emit();
    }

    togglePopout() {
        this.showPopout = !this.showPopout;
    }

    /**
     * This is used to hide the popout when clicking anywhere else on the screen.
     * @param event The click event
     */
    closePopout(event) {
        if (!this.elementView.nativeElement.contains(event.target)) {
            this.showPopout = false;
        }
    }

    logout() {
        this.router.navigate(['/auth'], {replaceUrl: true});
    }

    /**following is done to trigger the translate service.
     * onClick function is to expand the drop down panel to select the language, change() is to call select language.
     * selectLang is to call the translate service and refreshText is to handle the change between languages*/

    onClick(event) {
        this.expanded = !this.expanded;
        console.log(this.expanded);
    }

    // close on clicking outside;
    onClickOut(event) {
        if (this.expanded === true) {
            this.expanded = false;
        }
    }

    change(lang) {
        this.selectLang(lang.value);
        this.lang = lang.value;
        console.log('language stored', this.lang);
    }

    selectLang(lang: string) {
        this.translateService.use(lang);
    }

    isActive(lang) {
        return this.lang === lang ? 'active' : '';
    }

    toggleNotif() {
        this.comms.broadcast('toggle-notif');
    }

    private subscribeToTitleChange() {
        this.titleSub$ = this.router.events.subscribe(event => {
            this.breadcrumbs = [];
            if (event instanceof NavigationEnd) {
                this.title = this.getDeepestTitle(this.router.routerState.snapshot.root);
                console.log('title is', this.title);
                this.showOrHideIcons(event.url);
            }
        });
    }

    private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title = routeSnapshot.data ? routeSnapshot.data['title'] : '';
        if (routeSnapshot.firstChild) {
            title = this.getDeepestTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    private showOrHideIcons(url) {
        console.log('Registration', url.includes('/registration'));
        this.showNotif = !(url.includes('/registration') || url.includes('/resolver'));
    }
}
