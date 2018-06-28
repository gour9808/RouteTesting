import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BooksService {

  constructor(private http: HttpClient) { }


  getBooks(): Observable<any> {
    return this.http.get("https://restcountries.eu/rest/v2/all");
  }

}
