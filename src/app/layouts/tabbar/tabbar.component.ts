import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cbp-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss']
})
export class TabbarComponent implements OnInit {
  @Input() tabs: any;
  @Input() vertical: boolean;
  constructor() { }

  ngOnInit() {
  }

}
