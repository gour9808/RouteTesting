import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cbp-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {
  @Input() icon:any;
    @Input() label: any;
  constructor() { }

  ngOnInit() {
  }

}
