import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {VehicleService} from '../../service/vehicle.service';
import {Constants} from '../../service/constants';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {Subject} from 'rxjs/Subject';
import * as _ from 'lodash';

interface VehicleModel {
    name: any;
    logo: any;
    object: any;
}

@AutoUnsubscribe()
@Component({
    selector: 'cbp-input-field-autocomplete-vehicles',
    templateUrl: './input-field-autocomplete-vehicles.component.html',
    styleUrls: ['./input-field-autocomplete-vehicles.component.scss']
})
export class InputFieldAutocompleteVehiclesComponent implements OnInit, OnDestroy {
    searching: boolean;
    results: any = [];
    @Input() label: any;
    @Input() placeholder: any = 'Search';
    @Input() model: any;
    @Input() error: any;
    @Input() errorMessage: any;
    @Input() disabled: boolean;
    @Input() icon: any;
    @Input() iconColor: any;
    @Input() mandatory: boolean;
    @Input() readonly: boolean;
    @Output() pickedVehicle: EventEmitter<any> = new EventEmitter<any>();
    vehicles: VehicleModel[] = [];
    makemodel$;
    showBar: boolean;
    searchTerm$;
    highlightTerm;
    private searchTerms = new Subject<string>();

    constructor(private vehicleService: VehicleService) {
    }

    ngOnInit() {
        console.log('Model is ', this.model);
        this.searchTerm$ = this.searchTerms
            .debounceTime(500)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .subscribe(term => {
                if (term) {
                    this.search(term);
                } else {
                    this.searching = false;
                    this.results = [];
                }
            });
    }

    onInputChanged() {
        this.searching = true;
        this.searchTerms.next(this.model);
        this.highlightTerm = this.model;
    }

    ngOnDestroy() {
    }

    search(event) {
        console.log('Searching for ', event);
        this.makemodel$ = this.vehicleService.getMakeModelVariant(event).finally(() => this.searching = false).subscribe(res => {
            this.results = [];
            console.log('Vehicle search results', res);
            if (res) {
                // this.results = res['newResults'];
                this.results = _.map(res['newResults'], (result: any) => {
                    return {
                        name: result.make + ' ' + result.model + ' ' + result.variant,
                        logo: this.getVehicleLogo(result.make),
                        object: result
                    }
                });
                this.results = _.filter(this.results, (result) => [result.object.countryCode, localStorage.getItem('countryCode')]);
                console.log('Results ', this.results);
            }
        });
    }

    selected(event) {
        console.log('Selected Vehicle', event);
        this.model = event.name;
        this.pickedVehicle.emit(event);
    }

    out() {
        this.results = [];
    }

    getVehicleLogo(make) {
        if (make != null && make !== undefined && make.length > 1) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    formatResults(vehicle) {
        this.vehicles.push({
            name: vehicle.make + ' ' + vehicle.model + ' ' + vehicle.variant,
            logo: this.getVehicleLogo(vehicle.make),
            object: vehicle
        });
        this.results = this.vehicles;
    }

}
