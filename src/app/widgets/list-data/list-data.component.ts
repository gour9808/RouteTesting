import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'cbp-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss']
})
export class ListDataComponent implements OnInit {
  @Input() icon:any;
  @Input() color:any;
  @Input() label:any;
  @Input() value:any;


  constructor() { }

  ngOnInit() {
  }

}
