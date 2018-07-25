import { Component, OnInit } from '@angular/core';
import { DebugLevelService } from '../services/debug-level.service';
import * as  post from '../model/debug-level';
import { ToastsManager } from '../../../node_modules/ng2-toastr';


@Component({
  selector: 'app-view-debug-level-log',
  templateUrl: './view-debug-level-log.component.html',
  styleUrls: ['./view-debug-level-log.component.scss']
})
export class ViewDebugLevelLogComponent implements OnInit {
  fetchDebugLevel$: any = [];
  loading: boolean;
  selected: any;
  debugLevelId: string;
  config: any = [];
  displayDialog: boolean;
  debug: post.CreateDebugLevel = new post.CreateDebugLevel();

  constructor(private debugLevel: DebugLevelService, private toast: ToastsManager) { }

  ngOnInit() {
    this.config = [
      { label: 'FINEST', value: 'FINEST' },
      { label: 'FINER', value: 'FINER' },
      { label: 'FINE', value: 'FINE' },
      { label: 'DEBUG', value: 'DEBUG' },
      { label: 'INFO', value: 'INFO' },
      { label: 'WARN', value: 'WARN' },
      { label: 'ERROR', value: 'ERROR' },
    ];
    this.getDebugLevel();
  }

  getDebugLevel() {
    this.loading = true;
    this.debugLevel.getDebugLevel().subscribe(res => {
      console.log("debug level", res);
      this.fetchDebugLevel$ = res.records;
      this.loading = false;
    })
  }

  getParticularLogLevelData() {
    console.log(this.debugLevelId);
    this.debugLevel.getparticularDebugLevelData(this.debugLevelId).subscribe(res => {
      console.log(res);
      this.debug = res;
    })
  }

  viewDetails(event) {
    this.displayDialog = true;
    console.log(event.data.Id);
    this.debugLevelId = event.data.Id;
    this.getParticularLogLevelData();
  }

  deleteDebugLevelLog(event) {
    this.debugLevel.deleteDebugLogLevelById(event.Id).subscribe(res => {
      console.log(res);
      this.getDebugLevel();
    })
  }

  updateLogLevelId(event) {
    console.log(event);

    this.debug.ApexCode = event.ApexCode;
    this.debug.ApexProfiling = event.ApexProfiling;
    this.debug.Callout = event.Callout;;
    this.debug.Database = event.Database;
    this.debug.DeveloperName = event.DeveloperName;
    this.debug.MasterLabel = event.MasterLabel;
    this.debug.System = event.System;
    this.debug.Validation = event.Validation;
    this.debug.Visualforce = event.Visualforce;
    this.debug.Workflow = event.Workflow;
    this.debugLevel.updateDebugLevelData(event.Id, this.debug).subscribe(res => {
      console.log("update", res);
      this.toast.success("success")
    }, err => {
      this.toast.error(err)
    })
  }

  createNewDebugLevel() {
    this.debugLevel.createDebugLevel(this.debug).subscribe(res => {
      console.log(res);
      this.displayDialog = false;
      this.getDebugLevel();
    })
  }

  setApexCodeData(event) {
    this.debug.ApexCode = event.value;
  }

  setVisualForceData(event) {
    this.debug.Visualforce = event.value;
  }

  setSystemData(event) {
    this.debug.System = event.value;
  }

  setValidationData(event) {
    console.log(event.value);
    this.debug.Validation = event.value;
  }

  setMasterData(event) {
    console.log(event.value);
    this.debug.MasterLabel = event.value;

  }

  setWorkflowData(event) {
    this.debug.Workflow = event.value;
  }
  setApexProfillingData(event) {
    this.debug.ApexProfiling = event.value;
  }
  setCalloutData(event) {
    this.debug.Callout = event.value;
  }
  setDatabaseData(event) {
    this.debug.Database = event.value;
  }


}
