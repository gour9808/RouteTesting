import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cbp-minicard',
  templateUrl: './minicard.component.html',
  styleUrls: ['./minicard.component.scss']
})
export class MinicardComponent implements OnInit {
  @Input() items: any[]; 
  @Output() onItemChosen = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {
    console.log("items",this.items)
  }

  itemChosen(event){
    this.onItemChosen.emit(event);
  }

}
