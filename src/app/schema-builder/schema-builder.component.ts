import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../services/schema.service';

@Component({
  selector: 'app-schema-builder',
  templateUrl: './schema-builder.component.html',
  styleUrls: ['./schema-builder.component.scss']
})
export class SchemaBuilderComponent implements OnInit {
  objectList : any [];
  fieldList : any [];
  constructor(private schemaService : SchemaService) { }

  ngOnInit() {
      this.getAllObjects();
  }

  getAllObjects() {
    
    this.schemaService.getAllObjects().subscribe(res => {
      this.objectList = res.sobjects;
      console.log("res for all logs", this.objectList);
      //this.getAllFields(res.sobjects[0].name);
    }, err => {
      console.log("res for all logs err", err);
    })
  }

  getAllFields(e, objectName) {
    if(e.target.checked)
    {
      console.log(e.target.checked + '=='+ objectName);
      this.schemaService.getObjectFields(objectName.name).subscribe(res => {
        this.fieldList =  res.fields;
        console.log("res for all logs", res.fields);
      }, err => {
        console.log("res for all logs err", err);
      })
    }
  }
}
