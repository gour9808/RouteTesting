import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Utils} from '../../utils/utils';
import {ImageService} from '../../service/image.service';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import * as uuid from 'uuid';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'cbp-single-file-upload',
    templateUrl: './single-file-upload.component.html',
    styleUrls: ['./single-file-upload.component.scss']
})

@AutoUnsubscribe()
export class SingleFileUploadComponent implements OnInit, OnDestroy {
    imageUpload$;
    file: any;
    uploadedImages: any;
    showFile: boolean = false;
    showLoader: boolean = false;
    isDialogVisible: boolean;
    @Input() icon: any;
    @Input() label: any;
    @Input() class: any;
    @Input() color: any;
    @Input() pictureURL: any;
    @Output() uploadedURLs: EventEmitter<any> = new EventEmitter<any>();

    constructor(private imageService: ImageService) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    showDialogChange(data) {
        this.isDialogVisible = data;
    }

    /**
     * On filess selected from files explorer
     * @param event
     */
    onFilesSelected(event) {
        this.file = event.target.files[0];
        this.showFile = this.showLoader = true;
        this.setFileUpload();
    }

    setFileUpload() {
        const reader = new FileReader();
        reader.onloadend = () => {
            const image = this.stripMetaFromDataURL(reader.result, Utils.getExtension(this.file.name));
            this.upload({filename: this.file.name, imagetype: 'USER', objectid: uuid.v1(), content: image});
        };
        reader.readAsDataURL(this.file);
    }

    upload(data) {
        this.uploadedImages = null;
        this.imageUpload$ = this.imageService.dealerImageUpload(data).subscribe(res => {
                this.uploadedImages = res['pictureURL'];
                this.uploadedURLs.emit(this.uploadedImages);
                this.showLoader = false;
            },
            err => {
                console.log('error', err);
                this.showLoader = false;
            });
    }

    deleteFile() {
        this.pictureURL = null;
        this.uploadedImages = null;
        this.uploadedURLs.emit(this.uploadedImages);
        console.log('delete file', this.uploadedImages);
        this.showFile = false;
        this.isDialogVisible = false;
    }

    stripMetaFromDataURL(data, ext) {
        // console.log('Data strip is', data, ext);
        let base64;
        switch (ext) {
            case 'jpeg':
                base64 = data.replace('data:image/jpeg;base64,', '');
                break;
            case 'jpg':
                base64 = data.replace('data:image/jpeg;base64,', '');
                break;
            case 'png':
                base64 = data.replace('data:image/png;base64,', '');
                break;
            case 'gif':
                base64 = data.replace('data:image/gif;base64,', '');
                break;
            default:
                base64 = data.replace('data:;base64,', '');
        }
        return base64;
    }

}
