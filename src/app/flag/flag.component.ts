import { Component, OnInit } from '@angular/core';
import { MineLogsService } from '../services/mine-logs.service';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent implements OnInit {
  loading: boolean;
  showDialog: boolean;
  config: any[] = [];
  selected: any;

  constructor(private mine: MineLogsService) { }

  ngOnInit() {
    this.fetch();
    this.config = [
      { label: 'User', value: 'User' },
      { label: 'Class', value: 'Class' },
      { label: 'Trigger', value: 'Trigger' },
    ];
  }

  fetch() {
    this.mine.fetchFlags().subscribe(res => {
      console.log(res);

    })
  }

}
