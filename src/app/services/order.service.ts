import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import "rxjs/add/operator/map";
import { Order } from '../order';
import { MessageService } from './messages.service';
import { Phone } from '../phone';

@Injectable()
export class OrderService {
  orderCol: AngularFirestoreCollection<Order[]>;
  orderDoc: AngularFirestoreDocument<Order>;
  orderPosts: any;
  orders: Order[] = [];
  orders$: Observable<Order[]>;
  orderID: string;
  orderProducts: Phone[];
  products: AngularFirestoreCollection<Phone[]>;
  customerEmail: string;
  customerName: string;
  customerPhone: number;
  customerTaxCode: string;
  customerAddress: string;
  customerCity: string;
  customerDistrict: string;
  customerWard: string;
  totalCost: number;
  currentCost: number;
  createdDate: Date;
  description: string;
  latestOrder: string;
  constructor(
    private messageService: MessageService,
    private angularFirestore: AngularFirestore) { 
    }
  /** GET orders from the server */
  getOrders(): Observable<Order[]> {
    this.orderCol = this.angularFirestore.collection(
      "orders", ref => ref.orderBy("id"));
    this.orderPosts = this.orderCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.orderPosts.pipe(
      tap(phone => this.log(`fetched order`)),
      catchError(this.handleError("getOrders", []))
    );
  }
   /** Add new order */
   addOrder(orderID: string, customerEmail: string,customerName: string, customerPhone: number, 
    customerTaxCode: string, customerAddress: string, customerCity: string, customerDistrict: string,
    customerWard: string, totalCost: number, currentCost: number, createdDate: Date, description: string) {
    this.angularFirestore.collection("orders").doc(orderID).set({
      "id": orderID,
      "customerEmail": customerEmail,
      "customerName": customerName,
      "customerPhone": customerPhone,
      "customerTaxCode": customerTaxCode,
      "customerAddress": customerAddress,
      "customerCity": customerCity,
      "customerDistrict": customerDistrict,
      "customerWard": customerWard,
      "totalCost": totalCost,
      "currentCost": currentCost,
      "createdDate": createdDate,
      "description": description
    });
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
