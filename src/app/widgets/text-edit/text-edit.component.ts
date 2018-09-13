import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'cbp-text-edit',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.scss'],
  host: {
    '(document:click)': 'makeStatic($event)',
  }
})
export class TextEditComponent implements OnInit {
  @Input() model: any;
  @Input() font: any;
  isEdit:boolean;
  input:any;
  @Output() info : EventEmitter<any> = new EventEmitter<any>();
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('textEditInput') inputView: ElementRef;
  constructor() { }

  ngOnInit() {
    this.isEdit = true;
  }

  change(e){
    this.isEdit = !this.isEdit;
    console.log("read only",e)
    if(this.isEdit)
      this.input = '';
    else
      this.input = 'in';
    this.info.emit(this.model);
  }

  makeStatic(event){
    if (!this.inputView.nativeElement.contains(event.target)) {
      this.isEdit = true;
      this.input = '';
    }
  }

}
