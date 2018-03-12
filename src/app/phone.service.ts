import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Phone } from './phone';
import { MessageService } from './messages.service';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class PhoneService {
 
  private phoneUrl = 'api/phones';  // URL to web api
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
 
  /** GET heroes from the server */
  getPhones (): Observable<Phone[]> {
    return this.http.get<Phone[]>(this.phoneUrl)
      .pipe(
        tap(phone => this.log(`fetched phone`)),
        catchError(this.handleError('getPhones', []))
      );
  }
 
  /** GET hero by id. Return `undefined` when id not found */
  getPhoneNo404<Data>(id: number): Observable<Phone> {
    const url = `${this.phoneUrl}/?id=${id}`;
    return this.http.get<Phone[]>(url)
      .pipe(
        map(phones => phones[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} phone id=${id}`);
        }),
        catchError(this.handleError<Phone>(`getPhone id=${id}`))
      );
  }
 
  /** GET hero by id. Will 404 if id not found */
  getPhone(id: number): Observable<Phone> {
    const url = `${this.phoneUrl}/${id}`;
    return this.http.get<Phone>(url).pipe(
      tap(_ => this.log(`fetched phone id=${id}`)),
      catchError(this.handleError<Phone>(`getPhone id=${id}`))
    );
  }
 
  /* GET heroes whose name contains search term */
  searchPhone(term: string): Observable<Phone[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Phone[]>(`api/phones/?name=${term}`).pipe(
      tap(_ => this.log(`found phones matching "${term}"`)),
      catchError(this.handleError<Phone[]>('searchPhones', []))
    );
  }
 
  //////// Save methods //////////
 
  /** POST: add a new hero to the server */
  addPhone (phone: Phone): Observable<Phone> {
    return this.http.post<Phone>(this.phoneUrl, phone, httpOptions).pipe(
      tap((phone: Phone) => this.log(`added phone w/ id=${phone.id}`)),
      catchError(this.handleError<Phone>('addPhone'))
    );
  }
 
  /** DELETE: delete the hero from the server */
  deletePhone (phone: Phone | number): Observable<Phone> {
    const id = typeof phone === 'number' ? phone : phone.id;
    const url = `${this.phoneUrl}/${id}`;
 
    return this.http.delete<Phone>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted phone id=${id}`)),
      catchError(this.handleError<Phone>('deletePhone'))
    );
  }
 
  /** PUT: update the hero on the server */
  updatePhone (phone: Phone): Observable<any> {
    return this.http.put(this.phoneUrl, phone, httpOptions).pipe(
      tap(_ => this.log(`updated phone id=${phone.id}`)),
      catchError(this.handleError<any>('updatePhone'))
    );
  }
 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PhoneService: ' + message);
  }
}