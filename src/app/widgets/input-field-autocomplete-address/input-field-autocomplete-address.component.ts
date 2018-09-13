import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MapLoaderService} from '../../service/map-loader.service';
import {MapService} from '../../service/map.service';

declare var google;

@Component({
  selector: 'cbp-input-field-autocomplete-address',
  templateUrl: './input-field-autocomplete-address.component.html',
    styleUrls: ['./input-field-autocomplete-address.component.scss']
})
export class InputFieldAutocompleteAddressComponent implements OnInit {
  autocomplete: any;
  results: any;
  @Input() label: any;
  @Input() placeholder: any;
  @Input() model: any;
  @Input() error: any;
  @Input() errorMessage: any;
  @Input() icon: any;
  @Input() disabled: any;
  @Input() iconColor: any;
  @Input() mandatory: boolean;
  @Output() pickedAddress: EventEmitter<any> = new EventEmitter<any>();
  country: any;
  constructor(private mapService: MapService) { }

  ngOnInit() {
    MapLoaderService.load().then(() => {
      this.autocomplete = new google.maps.places.AutocompleteService();
    })
  }

  search(event) {
    console.log('Searching for ', event.query);
    this.autocomplete.getPlacePredictions({ input: event.query, componentRestrictions: { country: localStorage.getItem('countryCode') } }, res => {
      console.log('Places search', res);
      this.results = res;
    })
  }

  selected(event) {
    console.log('Selected Address', event);
    this.pickedAddress.emit(event);
  }

}
