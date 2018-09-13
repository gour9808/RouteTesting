import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'cbp-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss']
})
export class CircularProgressComponent implements OnInit {
  @Input() showDialog:boolean;
  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
