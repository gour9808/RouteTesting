import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cbp-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input() progress;
  @Input() color;
  constructor() { }

  ngOnInit() {
  }

}
