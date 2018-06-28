import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() menu: Array<Object>;

  constructor() { }

  ngOnInit() {
    console.log("Init Sidebar");
    console.log(this.menu);

  }


}
