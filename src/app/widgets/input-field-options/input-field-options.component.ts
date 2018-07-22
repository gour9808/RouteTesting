import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { MineLogsService } from '../../services/mine-logs.service';

@Component({
  selector: 'app-input-field-options',
  templateUrl: './input-field-options.component.html',
  styleUrls: ['./input-field-options.component.scss']
})
export class InputFieldOptionsComponent implements OnInit {
  autocomplete: any;
  results: any;
  @Input() label: any;
  @Input() placeholder: any;
  @Input() model: any;
  @Input() error: any;
  @Input() errorMessage: any;
  @Input() icon: any;
  @Input() disabled: any;
  @Input() iconColor: any;
  @Input() mandatory: boolean;
  @Output() pickedAddress: EventEmitter<any> = new EventEmitter<any>();
  country: any;
  constructor(private mine : MineLogsService) { }

  ngOnInit() {
   
  }

  search(event) {
    console.log('Searching for ', event.query);
    this.mine.searchUserForUser(event.query).subscribe(res => {
      console.log(res.records);
     this.results = res.records;
     
   })

  }

  selected(event) {
    console.log('Selected Address', event);
    this.pickedAddress.emit(event);
  }

}
