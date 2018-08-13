import { Component, OnInit } from '@angular/core';
import { MineLogsService } from '../services/mine-logs.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { ToastMessageService } from '../services/toast-message.service';
import * as  root from '../model/root';

@Component({
  selector: 'app-view-log-detail',
  templateUrl: './view-log-detail.component.html',
  styleUrls: ['./view-log-detail.component.scss']
})
export class ViewLogDetailComponent implements OnInit {
  sub$;
  id: any;
  data: any;
  root: root.Root = new root.Root();
  extTree: any
  nodeStack: any
  clearedInput = '';
  indent = 0;
  timeRegex = /\d\d:\d\d:\d\d\.\d\d\d/i;
  microsecondsRegex = /\(\d\d*\)/i;
  categoryRegex = /\|[^|]*/i;
  subcategoryRegex = /\|\[\w*\]/i;
  objectIdRegex = /\|[A-Z0-9]{15}\|/i;

  warned = false;
  node4Line: any;
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
      console.log(res);
    }, err => {
      console.log(this.realParse(err.error.text));
      console.log("parsed", this.realParse(err));

      this.data = err.error.text;
    })
  }

  parse(line, isDebug) {
    this.root.leaf = false;
    this.root.children = [];

    this.root.time = this.format(this.timeRegex.exec(line));
    this.root.microseconds = this.format(this.microsecondsRegex.exec(line));
    this.root.category = this.format(this.categoryRegex.exec(line));
    this.root.line = this.format(this.subcategoryRegex.exec(line));
    this.root.objectId = this.format(this.objectIdRegex.exec(line));

    line = line.replace(this.timeRegex, '');
    line = line.replace(this.microsecondsRegex, '');
    line = line.replace(this.categoryRegex, '');
    line = line.replace(this.subcategoryRegex, '');
    line = line.replace(this.objectIdRegex, '');

    var isEntry = false;
    var isExit = false;
    
  }

  realParse(input) {
    delete this.root.children;
    this.root.children = [];
    this.nodeStack = [this.root];
    var lines = input.split('\n');
    var numOk = 0;
    this.indent = 0;
    

  


  }

  format(resultsArray) {

    if (resultsArray && resultsArray[0]) {

      var text = resultsArray[0];

      if (text === null || text === undefined) {
        return '';
      }

      return text.String.htmlEncode(text.replace(/\|/, '').replace(/\|$/, ''));
    } else {
      return '';
    }
  }




}
