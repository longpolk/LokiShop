import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import "rxjs/add/operator/map";
import { catchError, map, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { City } from "../city";
import { Voucher } from "../voucher";
import { element } from "protractor";
import { of } from "rxjs/observable/of";
import { MessageService } from "./messages.service";

@Injectable()
export class MockDataService {
  vouchers: Voucher[];
  vouchers$: Observable<Voucher[]>;

  cityCol: AngularFirestoreCollection<City[]>;
  postDoc: AngularFirestoreDocument<City>;
  voucherCol: AngularFirestoreCollection<Voucher[]>;
  cityPosts: any;
  voucherPosts: any;
  post: Observable<City>;
  phones: City[] = [];
  constructor(
    private angularFirestore: AngularFirestore,
    private messageService: MessageService
  )
  {}
  /** Check the voucher code */
  getVoucherCode(): Observable<Voucher[]> {
    this.voucherCol = this.angularFirestore.collection(
      "vouchers"
    );
    this.voucherPosts = this.voucherCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Voucher;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.voucherPosts.pipe(
      tap(phone => this.log(`fetched phone`)),
      catchError(this.handleError("getPhones", []))
    );
  }
  /** GET list of cities from the server */
  getCities(): Observable<City[]> {
    this.cityCol = this.angularFirestore.collection("cities");
    this.cityPosts = this.cityCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as City;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.cityPosts;
  }
  getDistricts(city: string): Observable<City[]> {
    this.cityCol = this.angularFirestore.collection("cities");
    this.cityPosts = this.cityCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as City;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.cityPosts;
  }

  public handleError<T>(operation = "operation", result?: T) {
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
  public log(message: string) {
    this.messageService.add("PhoneService: " + message);
  }
  
}
