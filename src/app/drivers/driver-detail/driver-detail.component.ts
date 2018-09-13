import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ToastMessageService } from '../../service/toast-message.service';
import { AutoUnsubscribe } from '../../utils/auto-unsubscribe';

@Component({
  selector: 'cbp-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss'],
})

@AutoUnsubscribe()
export class DriverDetailComponent implements OnInit, OnDestroy {
  sub$;
  user$;
  componentRef: any;
  @Input() driver: any;
  id: any;
  tabs = [
    { name: 'DETAILS', path: 'info' },
    { name: 'LICENSE_INFORMATION', path: 'license' },
    { name: 'ADD_NEW_LICENSE', path: 'addLicense' }
  ];
  tabId: any;
  prev: any;
  @ViewChild('tabsContainer', { read: ViewContainerRef }) tabsContainer;

  constructor(private route: ActivatedRoute,
    private userService: UserService, private router: Router,
    private compFacoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef, private msgService: ToastMessageService) {
  }

  ngOnInit() {
    this.sub$ = this.route.params.subscribe(params => {
      this.id = params['userId'];
    });

    this.getDriverInfo();
  }

  ngOnDestroy() { }

  getDriverInfo() {
    console.log('id sent to details', this.id);
    this.tabId = this.id;
    this.user$ = this.userService.fetchUserById(this.id).subscribe(res => {
      console.log('Driver Details: ', res);
      this.driver = res;
    }, error => {
      this.msgService.showError("ERROR", "ERROR_FETCHING_DRIVER_INFORMATION")
    });
  }
}
