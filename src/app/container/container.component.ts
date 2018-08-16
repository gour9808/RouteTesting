import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  showSidenav: boolean = true;
  showNewWindow: boolean = false;
  show: string;
  menuItems = [{
    name: "Debug",
    icon: "fa-dashboard",
    path: "/home/my",
    active: true
  },
  {
    name: "Events",
    icon: "fa-line-chart",
    path: "/home/events/all",
    active: true
  },
  {
    name: "Discussions",
    icon: "fa-users",
    path: "/home/discussions/all",
    active: true,

  },
  ];

  constructor(private router: Router, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log('Init Container');
  }

  openInNewWindow() {
    chrome.windows.create({
      url: "index.html",
      type: 'panel',
      width: 1200,
      height: 800,

    },
      () => { });

  }

  goToCredits() {
    console.log(this.currentRoute);
    this.router.navigate(['./credits'], { relativeTo: this.currentRoute })
  }

}
