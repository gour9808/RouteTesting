import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cbp-flat-button',
  templateUrl: './flat-button.component.html',
  styleUrls: ['./flat-button.component.scss']
})
export class FlatButtonComponent implements OnInit {
    @Input() label;
  @Input() disabled;
    @Input() type;
  constructor() { }

  ngOnInit() {
  }

}
