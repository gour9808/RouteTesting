import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cbp-expandable-list-item',
  templateUrl: './expandable-list-item.component.html',
  styleUrls: ['./expandable-list-item.component.scss']
})
/**
 * The format of the children should be:
 *   name: "Calendar",
 *   icon: "mdi-calendar",
 *   path: "/dashboard/calendar",
 *   active: false
 */
export class ExpandableListItemComponent implements OnInit {
  @Input() label: any;
  @Input() icon: any;
  @Input() children: any;
    @Input() path: any;
    @Input() query: any;
    @Input() img: string;
    @Input() notmdi: boolean;
    @Input() expanded: boolean;
  constructor() {
  }

  ngOnInit() {
  }

}
