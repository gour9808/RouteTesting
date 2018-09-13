import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { ModalService } from './modal.service'

@Component({
  selector: 'cbp-modal',
  template: '<ng-content></ng-content>',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = $(el.nativeElement);
  }

  ngOnInit() {
    let modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    this.element.appendTo('body');

    // close modal on background click
    this.element.on('click', function (e: any) {
      var target = $(e.target);
      if (!target.closest('.modal-body').length) {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    console.log("Adding into modal")
    this.modalService.add(this);
  }

  ngOnDestroy() {
    this.modalService.remove(this.id);
    this.element.remove();
  }
  // open modal
  open(): void {
    console.log("Open Modal")
    this.element.show();
    $('body').addClass('modal-open');
    $('cbp-modal').addClass('modal-open');
  }

  // close modal
  close(): void {
    this.element.hide();
    $('body').removeClass('modal-open');
  }
}
