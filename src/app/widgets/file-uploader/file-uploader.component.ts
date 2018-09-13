import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageService} from '../../service/image.service';
import {Utils} from '../../utils/utils';
import * as _ from 'lodash';
import {ToastyService} from 'ng2-toasty';
import {Cache} from '../../utils/storage.provider';
import * as cbv from '../../models/vendor';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import * as uuid from 'uuid';

@AutoUnsubscribe()
@Component({
  selector: 'cbp-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit, OnDestroy {
  @Cache({ pool: 'Vendor' }) vendorId: any;
  uploading: boolean;
  images: any[] = [];

  imageMetas: any[] = [];
  imageList: any[] = [];
  uploadedImages: any[] = [];
  imagePreviewUrl: any;
  uploaded: boolean;
  counter = 0;
  uploadFail = false;
  @Input() options: any;
  @Input() showDialog: any;
  @Output() showDialogChange: any = new EventEmitter<any>();
  @Output() uploadPath: any = new EventEmitter<any>();
  @Output() uploadedURLs: EventEmitter<any> = new EventEmitter<any>();
  hover: any;
  dealerImage: any;
  imageUpload$;

  image: cbv.Vendor.Image = new cbv.Vendor.Image();
  constructor(private sanitizer: DomSanitizer, private imageService: ImageService, private toastyService: ToastyService) { }

  ngOnInit() {
    this.uploaded = false;
  }

  ngOnDestroy() {}

  /**
   * Color the drop zone when dragging file
   * @param event
   */
  fileOver(event) {
    this.hover = event;
  }

  extensionCheck(images) {
     images.forEach(img => {
      const Extension = Utils.getExtension(img.name);
      if (Extension === 'png' || Extension === 'jpeg' || Extension === 'jpg' || Extension === 'gif') {
        console.log('proper', img.name)
      } else {
          this.toastyService.error({
          title: 'Unsupported Image Format for' + img.name,
          msg: 'Upload only  PNG,JPEG,JPG,GIF',
          showClose: false,
          timeout: 3000,
          theme: 'default'
        });
      }
    })
  }

  /**
   * On files dropped
   * @param event
   */
  onFilesChange(event) {
    this.images = Array.from(event);
    if (this.images) {
      this.extensionCheck(this.images);
    }
    this.images = Utils.returnImages(this.images);
    this.images.length > 5 ? this.images.length = 5 : null;
    console.log(this.images);
    this.populateMeta();
  }

  /**
   * On files selected from file explorer
   * @param event
   */
  onFilesSelected(event) {
      console.log('file selected', event);
    this.images = Array.from(event.target.files);
     if (this.images) {
      this.extensionCheck(this.images);
     }
    this.images = Utils.returnImages(this.images);
    console.log('image', this.images, 'util', Utils.returnImages(this.images));

    this.images.length > 5 ? this.images.length = 5 : null;
    console.log(this.images);
    this.populateMeta();
  }

  getImageForFile(file) {
    return this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file)));
  }

  /**
   * Reinitalize everything on hide, because dialog hide does not call onDestroy event
   */
  hide() {
    this.showDialog = false;
    this.uploading = false;
    this.images.length = 0;
    this.imageMetas.length = 0;
    this.showDialogChange.emit(this.showDialog);
  }

  done() {
    this.uploadedURLs.emit(this.uploadedImages);
    this.hide();
  }


  populateMeta() {
    this.images.forEach(image => {
      this.imageMetas.push({ name: image.name, size: image.size, status: false, object: image });
    });
    this.imageMetas = [...this.imageMetas];
    console.log(this.imageMetas);
  }

  startUpload(event) {
    this.uploading = true;
  }

  deleteImage(img) {
    console.log('Delete', img);
    _.remove(this.imageMetas, function (imgR) {
      return imgR.name === img.name;
    });
    this.imageMetas = [...this.imageMetas]; // hack to update the list
    _.remove(this.images, function (imgR) {
      return imgR.name === img.name;
    });
    this.images = [...this.images]; // hack to update the list
    console.log(this.images);
  }

  deleteFromImageList(img) {
    _.remove(this.imageList, function (imgR) {
      return imgR === img;
    })
  }

  uploadImages() {
    this.uploading = true;
    console.log('Uploaded', this.imageMetas);
    this.imageMetas.forEach((img, index) => {
      console.log(index);
      const reader  = new FileReader();
        reader.onloadend = () => {
            console.log('content in reader is', reader);
            const image = this.stripMetaFromDataURL(reader.result, Utils.getExtension(img.name));
            console.log('image with ext is', image);
            this.upload({filename: img.name, imagetype: 'VENDOR', objectid: uuid.v1(), content: image}, index);
        };
        reader.readAsDataURL(img.object);
    })
  }

  upload(data, index) {
    this.uploadedImages = [];
    this.imageUpload$ = this.imageService.dealerImageUpload(data).subscribe(res => {
      this.imageMetas[index].status = true;
      this.uploadedImages.push(res['pictureURL']);
      console.log('upload', this.uploadedImages);
    },
      err => {
        this.uploadFail = true;
        console.log('error', err);
      });
  }

  getUploadStatus() {
    if (this.imageMetas.length > 0) {
      return this.imageMetas.every(this.statusTrue);
    }
    return false;
  }

  private statusTrue(img) {
    return img.status ? img.status : false;
  }

  stripMetaFromDataURL(data, ext) {
      console.log('Data strip is', data);
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
    }
        return base64;
  }
}
