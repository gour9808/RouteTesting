import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AutoUnsubscribe } from '../../utils/auto-unsubscribe';

@Component({
  selector: 'app-input-field-search',
  templateUrl: './input-field-search.component.html',
  styleUrls: ['./input-field-search.component.scss']
})
@AutoUnsubscribe()
export class InputFieldSearchComponent implements OnInit, OnDestroy {

  @Input() label: any = '';
  @Input() placeholder: any = '';
  @Input() model: any;
  @Input() error: any;
  @Input() errorMessage: any;
  @Input() maxlength: any;
  @Input() disabled: any;
  @Input() action: any;
  @Input() searching: boolean;
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchTerm: EventEmitter<any> = new EventEmitter<any>();
  showBar: boolean;
  searchTerm$;
  private searchTerms = new Subject<string>();

  constructor() {
  }

  ngOnInit() {
    this.searchTerm$ = this.searchTerms
      .debounceTime(500)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .subscribe(term => {
        this.searchTerm.emit(term);
      });
  }

  ngOnDestroy() {
  }

  onInputChanged() {
    this.searching = true;
    this.searchTerms.next(this.model);
  }

  public setSearching(search: boolean) {
    this.searching = search;
  }

  out() {
    console.log('Click works');
    this.showBar = !this.showBar;
  }
}
