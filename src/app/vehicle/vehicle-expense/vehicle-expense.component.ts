import {Component, OnInit} from '@angular/core';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';

@Component({
  selector: 'cbp-vehicle-expense',
  templateUrl: './vehicle-expense.component.html',
  styleUrls: ['./vehicle-expense.component.scss']
})

@AutoUnsubscribe()
export class VehicleExpenseComponent implements OnInit {

    constructor() {
  }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
