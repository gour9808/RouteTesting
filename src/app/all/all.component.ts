import { Component, OnInit } from '@angular/core';
import { MineLogsService } from '../services/mine-logs.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  allLogs$: any = [];
  loading: boolean;
  showDialog: boolean;
  selected: any;

  constructor(private mineService: MineLogsService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllLogs();
  }

  getAllLogs() {
    this.loading = true;
    this.mineService.getAllLogs().subscribe(res => {
      console.log("res for all logs", res);
      this.allLogs$ = res.records;
      this.loading = false;
    })
  }

  viewDebugLogs(event) {
    console.log("on row select", event.data);
    this.router.navigate(['../details', event.data.Id], {relativeTo: this.route});
  }

}
