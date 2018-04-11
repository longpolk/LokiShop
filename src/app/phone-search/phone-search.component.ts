import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Phone } from '../phone';
import { PhoneService } from '../services/phone.service';

@Component({
  selector: 'app-phone-search',
  templateUrl: './phone-search.component.html',
  styleUrls: [ './phone-search.component.css' ]
})
export class PhoneSearchComponent implements OnInit {
  phones$: Observable<Phone[]>;
  private searchTerms = new Subject<string>();

  constructor(private phoneService: PhoneService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    /*this.phones$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.phoneService.searchPhone(term))
    );*/
  }
}