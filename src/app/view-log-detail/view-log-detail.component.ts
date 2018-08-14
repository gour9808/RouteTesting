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
  time: any[] = [];
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
  selectedCategories: string[] = ['Technology', 'Sports'];
  constructor(private mine: MineLogsService, private toast: ToastMessageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub$ = this.route.params.subscribe(params => {
      this.id = params['recordId'];
      console.log("id is", this.id);

    });
    this.getParticularLog();
  }

  checkTimeValue(e) {
    console.log(e);

  }


  getParticularLog() {
    this.mine.getParticularLog(this.id).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
      this.data = this.realParse(err.error.text)
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
    if (line.trim().length === 0) {
      line = this.root.category;
    }
    this.root.isEntry = false;
    this.root.isExit = false;
    this.root.isException = false;
    if (isDebug == true) {
      this.root.isDebug = true;
    } else {
      this.root.isDebug = false;
    }
    if (this.root.category.length > 0) {

      if (/METHOD_ENTRY|CONSTRUCTOR_ENTRY|DML_BEGIN|SOQL_EXECUTE_BEGIN|CODE_UNIT_STARTED|VF_DESERIALIZE_VIEWSTATE_BEGIN|CUMULATIVE_LIMIT_USAGE/.test(this.root.category)) {
        this.root.isEntry = true;
      } else if (/METHOD_EXIT|CONSTRUCTOR_EXIT|DML_END|SOQL_EXECUTE_END|CODE_UNIT_FINISHED|VF_DESERIALIZE_VIEWSTATE_END|CUMULATIVE_LIMIT_USAGE_END/.test(this.root.category)) {
        this.root.isExit = true;
      } else if (/EXCEPTION_THROWN|FATAL_ERROR/.test(this.root.category)) {
        this.root.isException = true;
        this.root.icon = 'http://extjs-public.googlecode.com/svn/tags/extjs-4.1.1a/release/resources/themes/images/default/form/exclamation.gif';
      } else if (/USER_DEBUG/.test(this.root.category)) {
        this.root.isDebug = true;
        this.root.icon = 'http://extjs-public.googlecode.com/svn/tags/extjs-4.1.1a/release/resources/themes/images/default/shared/warning.gif';
      }
    }
    if (this.root.isEntry) {
      this.indent++;
      this.nodeStack[this.nodeStack.length - 1].children.push(this.root);
      this.nodeStack.push(this.root);
    } else if (this.root.isExit) {
      this.indent--;
      var offNode = this.nodeStack.pop();

      if (offNode.children.length === 0) {
        offNode.leaf = true;
      } else {
        offNode.expanded = true;
      }
    } else {
      this.root.leaf = true;
      this.nodeStack[this.nodeStack.length - 1].children.push(this.root);
    }

    if (this.indent < 0) {
      line += " NEGATIVE INDENT ";
    }

    this.root.text = this.format([line]);
    return this.root;


  }

  realParse(input) {
    delete this.root.children;
    this.root.children = [];
    this.nodeStack = [this.root];
    var lines = input.split('\n');
    var numOk = 0;
    this.indent = 0;

    for (var i = 0; i < lines.length; i++) {

      var line = lines[i];
      this.time.push(lines[i]);
      console.log("lines are", line);


      if (this.timeRegex.test(line)) {
        this.node4Line = this.parse(line, false);

        if (line.indexOf('USER_DEBUG') > 0) {
          while (!this.timeRegex.test(lines[++i])) {
            this.node4Line = this.parse(lines[i], true);
          }
          --i;
        }
        if (line.indexOf('CUMULATIVE_LIMIT_USAGE') > 0 && line.indexOf('CUMULATIVE_LIMIT_USAGE_END') < 0) {
          while (lines[++i].indexOf('CUMULATIVE_LIMIT_USAGE_END') < 0) {
            this.node4Line.children.push({
              time: '',
              line: '',
              microseconds: '',
              objectId: '',
              category: '',
              leaf: true,
              text: '\r\n' + lines[i],
              isEntry: false,
              isExit: false,
              isException: false,
              isDebug: false
            });
          }
          --i;
        }
        ++numOk;
      }
    }



    if (this.indent !== 0) {
      //        alert('Either your log was truncated or something went wrong. (Non-zero indent at end: ' + indent + ')');
    }

    if (input && input.length > 0 && numOk === 0) {
      alert("Didn't understand the input.");
    }


  }


  format(resultsArray) {

    if (resultsArray && resultsArray[0]) {
      var text = resultsArray[0];
      if (text === null || text === undefined) {
        return '';
      }

      return (text.replace(/\|/, '').replace(/\|$/, ''));
    } else {
      return '';
    }
  }



}
