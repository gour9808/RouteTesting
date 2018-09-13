import {Injectable} from '@angular/core';
import {ToastyService} from 'ng2-toasty';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ToastMessageService {

    constructor(private toastyService: ToastyService, private translateService: TranslateService) {
    }

    showSuccess(message, details?) {
        let title1: string;
        let subTitle: string;
        this.translateService.get(message).subscribe((res => {
            title1 = res;
        }));
        if (details) {
            this.translateService.get(details).subscribe((res: any) => {
                subTitle = res;
            });
        }
        this.toastyService.success({
            title: title1,
            msg: subTitle || ' ',
            showClose: false,
            timeout: 3000,
            theme: 'default'
        });
    }

    showError(message, details) {
        let title1: string;
        let subTitle: string;
        this.translateService.get(message).subscribe((res => {
            title1 = res;
        }));
        this.translateService.get(details).subscribe((res: any) => {
            subTitle = res;
        });
        if (details) {
            this.toastyService.error({
                title: title1,
                msg: subTitle || ' ',
                showClose: false,
                timeout: 3000,
                theme: 'default'
            });
        }
    }

}
