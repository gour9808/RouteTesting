import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cbp-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss']
})
export class TabBarComponent implements OnInit {
  @Input() tabs:any;
  
  constructor() { }

  ngOnInit() {
  }

}
