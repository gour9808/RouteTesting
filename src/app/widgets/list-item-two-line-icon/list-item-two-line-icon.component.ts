import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cbp-litli',
  templateUrl: './list-item-two-line-icon.component.html',
  styleUrls: ['./list-item-two-line-icon.component.scss']
})
export class ListItemTwoLineIconComponent implements OnInit {
  @Input() icon:any;
  @Input() color:any;
  @Input() label:any;
  @Input() value:any;
  constructor() { }

  ngOnInit() {
  }

}
