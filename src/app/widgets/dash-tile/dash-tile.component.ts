import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'cbp-dash-tile',
  templateUrl: './dash-tile.component.html',
  styleUrls: ['./dash-tile.component.scss']
})
export class DashTileComponent implements OnInit {


  @Input() icon: any;
  @Input() subtitle: any;
  @Input() title: string;
  @Input() runCounter: any;
  @Input() background: any;
  @Input() hovercolor: any;
  n = 0;
  @ViewChild('dash') dash;
  constructor() {
  }

  ngOnInit() {
  }

  public callBack(counter) {
    var interval = setInterval(() => {
      if (this.n < counter) { this.n++; }
      else
        clearInterval(interval);
    }, 100);
  }

}
