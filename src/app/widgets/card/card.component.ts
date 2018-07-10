import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() label;
  @Input() showExpansion;
  @Input() expanded = true;
  @Input() showBack: boolean;
  @Input() searching: boolean;
  @Input() showHeader = true;
  @Output() onBackPressed = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  back() {
      this.onBackPressed.emit();
  }
}
