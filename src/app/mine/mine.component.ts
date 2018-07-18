import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { ToastMessageService } from '../services/toast-message.service';
import { MineLogsService } from '../services/mine-logs.service';
import { Cache } from '../utils/storage.provider';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss']
})
export class MineComponent implements OnInit {
  mineLogs$: any = [];
  loading: boolean;
  showDialog: boolean;
  @Cache({ pool: 'LogUserId' }) logUserId: any


  constructor(private books: BooksService, private mineService: MineLogsService, private toast: ToastMessageService) {
  }

  ngOnInit() {
    this.getMineLogs();
  }


  getMineLogs() {
    this.loading = true;
    this.mineService.getMineLogs(this.logUserId.userId).subscribe(res => {
      console.log("mine logs", res.records);
      this.mineLogs$ = res.records;
      this.loading = false;

    })
  }

  
}
