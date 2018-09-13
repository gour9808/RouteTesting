import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from '../../common/communicator.service';

@Component({
  selector: 'cbp-settings-main',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.scss']
})
export class SettingsMainComponent implements OnInit {

  tabs = [
    {name:'ORGANIZATION',path: 'org'},
    {name:'FLEET',path: 'fleet'},
  ]
  constructor(private comms:CommunicatorService) { }

  ngOnInit() {
    this.comms.broadcast("update-title","Settings");    
  }

}
