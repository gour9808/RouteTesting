import {Component, Input, OnInit} from '@angular/core';
import {NouiFormatter} from 'ng2-nouislider';

export class TimeFormatter implements NouiFormatter {
  to(value: number): string {
    return value + 'm';
  };

  from(value: string): number {
    return 10;
  }
}


@Component({
  selector: 'cbp-input-field-range-slider',
  templateUrl: './input-field-range-slider.component.html',
  styleUrls: ['./input-field-range-slider.component.scss']
})
export class InputFieldRangeSliderComponent implements OnInit {
    @Input() someRange;
  config: any = {
    connect: true,
    start: 10 ,
    step: 10,
    range: {
      'min': 10 ,
      'max': 100
    },
    tooltips: new TimeFormatter()
  };

  constructor() { }

  ngOnInit() {
  }
}
