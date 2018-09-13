import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cbp-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() icon:any;
  @Input() text:any;
  @Input() class:any;
  constructor() { }

  ngOnInit() {
  }

}
