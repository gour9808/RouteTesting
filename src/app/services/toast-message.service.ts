import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ToastMessageService {

  constructor(private toastyService: ToastyService) {
  }

  showSuccess(message, details?) {
    this.toastyService.success({
      title: message,
      msg: details || ' ',
      showClose: false,
      timeout: 3000,
      theme: 'default'
    });
  }

  showError(message, details) {
    this.toastyService.error({
      title: message,
      msg: details || ' ',
      showClose: false,
      timeout: 3000,
      theme: 'default'
    });
  }
}


