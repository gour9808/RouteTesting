import { Component, OnInit } from '@angular/core';
import { MineLogsService } from '../services/mine-logs.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { ToastMessageService } from '../services/toast-message.service';

@Component({
  selector: 'app-view-log-detail',
  templateUrl: './view-log-detail.component.html',
  styleUrls: ['./view-log-detail.component.scss']
})
export class ViewLogDetailComponent implements OnInit {
  sub$;
  id: any;
  data: any;
  constructor(private mine: MineLogsService, private toast: ToastMessageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub$ = this.route.params.subscribe(params => {
      this.id = params['recordId'];
      console.log("id is", this.id);

    });
    this.getParticularLog();
  }


  getParticularLog() {
    this.mine.getParticularLog(this.id).subscribe(res => {
    //  console.log(res.headers.get('Content-Type'));
    }, err => {
        console.log(err.error.text);
        this.data = err.error.text;
      })
  }
}
