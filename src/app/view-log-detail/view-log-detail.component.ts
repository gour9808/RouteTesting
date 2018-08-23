import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MineLogsService } from '../services/mine-logs.service';
import { ActivatedRoute } from '@angular/router';
import { ToastMessageService } from '../services/toast-message.service';
import * as  root from '../model/root';
import * as node from '../model/node';
import * as node4Line from '../model/nodeLine';

@Component({
  selector: 'app-view-log-detail',
  templateUrl: './view-log-detail.component.html',
  styleUrls: ['./view-log-detail.component.scss']
})
export class ViewLogDetailComponent implements OnInit {
  @ViewChild('selector') private someName;
  sub$;
  checked: boolean;
  time: any[] = [];
  savedChildren: any;
  id: any;
  data: any;
  root: root.Root = new root.Root();
  node: node.Node = new node.Node();
  node4Line: any;
  extTree: any
  nodeStack: any[] = [];
  hero: any
  clearedInput = '';
  indent = 0;
  timeRegex = /\d\d:\d\d:\d\d\.\d*/i;
  microsecondsRegex = /\(\d\d*\)/i;
  categoryRegex = /\|[^|]*/i;
  subcategoryRegex = /\|\[\w*\]/i;
  objectIdRegex = /\|[A-Z0-9]{15}\|/i;
  warned = false;
  devRef: any;
  selectedCategories: string[] = ['Technology', 'Sports'];
  constructor(private mine: MineLogsService,
    private toast: ToastMessageService,
    private route: ActivatedRoute,
    protected elementRef: ElementRef) { }

  ngOnInit() {
    this.sub$ = this.route.params.subscribe(params => {
      this.id = params['recordId'];
      console.log("id is", this.id);

    });
    this.getParticularLog();
    //this.hero = JSON.stringify(this.root)
  }




  getParticularLog() {
    this.mine.getParticularLog(this.id).subscribe(res => {
      console.log("success", res);
    }, err => {
      console.log("error is", err);
      this.data = this.realParse(err.error.text);
    })


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

      if (this.timeRegex.test(line)) {
        var node4Line = this.parseLine(line, false);
        if (line.indexOf('USER_DEBUG') > 0) {
          while (!this.timeRegex.test(lines[++i])) {
            this.node4Line = this.parseLine(lines[i], true);
          }
          --i;
        }
        if (line.indexOf('CUMULATIVE_LIMIT_USAGE') > 0 && line.indexOf('CUMULATIVE_LIMIT_USAGE_END') < 0) {
          while (lines[++i].indexOf('CUMULATIVE_LIMIT_USAGE_END') < 0) {
            // node4Line.children.push({
            //     time: '',
            //     line: '',
            //     microseconds: '',
            //     objectId: '',
            //     category: '',
            //     leaf: true,
            //     text: '\r\n' + lines[i],
            //     isEntry: false,
            //     isExit : false,
            //     isException : false,
            //     isDebug : false
            // });
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
    alert("got data");


    this.render();
  }




  parseLine(line, isDebug) {


    this.node.leaf = false;
    this.node.children = [];

    this.node.time = this.format(this.timeRegex.exec(line));
    this.node.microseconds = this.format(this.microsecondsRegex.exec(line));
    this.node.category = this.format(this.categoryRegex.exec(line));
    this.node.line = this.format(this.subcategoryRegex.exec(line));
    this.node.objectId = this.format(this.objectIdRegex.exec(line));

    line = line.replace(this.timeRegex, '');
    line = line.replace(this.microsecondsRegex, '');
    line = line.replace(this.categoryRegex, '');
    line = line.replace(this.subcategoryRegex, '');
    line = line.replace(this.objectIdRegex, '');

    var isEntry = false;
    var isExit = false;

    if (line.trim().length === 0) {
      line = this.node.category;
    }

    this.node.isEntry = false;
    this.node.isExit = false;
    this.node.isException = false;
    if (isDebug == true) {
      this.node.isDebug = true;
    } else {
      this.node.isDebug = false;
    }
    if (this.node.category.length > 0) {

      if (/METHOD_ENTRY|CONSTRUCTOR_ENTRY|DML_BEGIN|SOQL_EXECUTE_BEGIN|CODE_UNIT_STARTED|VF_DESERIALIZE_VIEWSTATE_BEGIN|CUMULATIVE_LIMIT_USAGE/.test(this.node.category)) {
        this.node.isEntry = true;
      } else if (/METHOD_EXIT|CONSTRUCTOR_EXIT|DML_END|SOQL_EXECUTE_END|CODE_UNIT_FINISHED|VF_DESERIALIZE_VIEWSTATE_END|CUMULATIVE_LIMIT_USAGE_END/.test(this.node.category)) {
        this.node.isExit = true;
      } else if (/EXCEPTION_THROWN|FATAL_ERROR/.test(this.node.category)) {
        this.node.isException = true;
        this.node.icon = 'http://extjs-public.googlecode.com/svn/tags/extjs-4.1.1a/release/resources/themes/images/default/form/exclamation.gif';
      } else if (/USER_DEBUG/.test(this.node.category)) {
        this.node.isDebug = true;
        this.node.icon = 'http://extjs-public.googlecode.com/svn/tags/extjs-4.1.1a/release/resources/themes/images/default/shared/warning.gif';
      }
    }

    if (this.node.isEntry) {
      this.indent++;
      this.nodeStack[this.nodeStack.length - 1].children.push(this.node);
      this.nodeStack.push(node);
    } else if (this.node.isExit) {
      this.indent--;
      var offNode = this.nodeStack.pop();

      if (offNode.children.length === 0) {
        offNode.leaf = true;
      } else {
        offNode.expanded = true;
      }
    } else {
      this.node.leaf = true;
      this.nodeStack[this.nodeStack.length - 1].children.push(this.node);
    }

    if (this.indent < 0) {
      line += " NEGATIVE INDENT ";
    }

    this.node.text = this.format([line]);
    console.log("node is", this.node);
    
    return this.node;

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

  render() {
    this.realRender();
  }

  realRender() {

    var table = document.getElementById('output');
    table.innerHTML = ''; // Remove existing output

    // Faster plain table rendering
    var includeTime = true
    var includeMicroseconds = true
    var includeCategory = true
    var includeSubcategory = true
    var includeObjectId = true

    if (!this.root.children || this.root.children.length == 0) {
      return;
    }

    this.renderNode(table, root, -1, includeTime, includeMicroseconds, includeCategory, includeSubcategory, includeObjectId);

  }

   renderNode(table, node, depth, includeTime, includeMicroseconds, includeCategory, includeSubcategory, includeObjectId) {

      var tr = document.createElement('tr');

      node.tr = tr;
      tr['node'] = node;
      console.log("node in render node", node);
      

      if (includeTime) this.createCell(tr, node.time);
      if (includeMicroseconds) this.createCell(tr, node.microseconds);
      if (includeObjectId) this.createCell(tr, node.objectId);
      if (includeSubcategory) this.createCell(tr, node.line);
      if (includeCategory) this.createCell(tr, node.category);

      var paddingLeft = 30 * depth;
      if (true)
     this. createCell(tr, node.text);

      if (node.isException) {
          tr.className = 'exception';
      } else if (node.isDebug) {
          tr.className = 'debug';
      } else if (node.isHeader) {
          tr.className = 'header';
      } else {
          tr.className = 'logRow';
      }
     

      table.appendChild(tr);

      if (node.children) {

          for (var i = 0; i < node.children.length; i++) {
             this. renderNode(table, node.children[i], depth + 1, includeTime, includeMicroseconds, includeCategory, includeSubcategory, includeObjectId);
          }

      }
  }


   createCell(tr, text) {

      var td = document.createElement('td');

      td.className = 'logCell';


      td.appendChild(document.createTextNode((text)));

     

      tr.appendChild(td);
  }

   handleToggle(e) {

      var event = e ? e : window.event;
      var target = event.target ? event.target : event.srcElement;
      var row = target.parentElement.parentElement;
      var node = row['node'];

      var isExpand = !node.expanded;
      node.expanded = isExpand;
      //previously image change function used as given below... 
      //node.tr.src = isExpand ? 'expand.png' : 'collapse.png';
      //Now its changed...
      var numberOfNodeTrChilds = node.tr.children.length;
      node.tr.children[numberOfNodeTrChilds - 1].children[0].src = isExpand ? 'collapse.png' : 'expand.png';
      node.tr.style.backgroundColor = isExpand ? '#eee' : '#fdf';

     this. toggle(node, isExpand);

  }

   toggle(node, isExpand) {

      for (var i = 0; node.children && i < node.children.length; i++) {

          var child = node.children[i];

          if (!isExpand) {
              child.tr.style.display = 'none';
              this.toggle(child, isExpand);
          } else {

              child.tr.style.display = '';

              if (child.expanded) {
                  this.toggle(child, isExpand);
              }

          }

        }
      }

}