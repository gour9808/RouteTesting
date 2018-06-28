import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() label: any;
  @Input() icon: any;
  @Input() class: any;
  @Input() path: any;
  @Input() query: any;
  @Input() img: string;
  @Input() notmdi: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
