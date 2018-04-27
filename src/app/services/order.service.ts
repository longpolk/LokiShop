import { Injectable, ViewChild,
  NgZone,
  ElementRef} from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import "rxjs/add/operator/map";
import { Order } from "../order";
import { MessageService } from "./messages.service";
import { Phone } from "../phone";
import {} from "googlemaps";
import { MapsAPILoader } from "@agm/core";
import { Http } from "@angular/http";

@Injectable()
export class OrderService {
  orderCol: AngularFirestoreCollection<Order[]>;
  phoneCol: AngularFirestoreCollection<Phone[]>;
  orderDoc: AngularFirestoreDocument<Order>;
  orderPosts: any;
  phonePosts: any;
  orders: Order[] = [];
  phones: Phone[] = [];
  orders$: Observable<Order>;
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
  observableLocation: Observable<any>;
  places: any[] = [];
  public latitude: number;
  public longitude: number;
  public zoom: number;

  constructor(
    private messageService: MessageService,
    private angularFirestore: AngularFirestore,
    private http: Http
  ) {}
  /** GET orders from the server */
  getOrders(): Observable<Order[]> {
    this.orderCol = this.angularFirestore.collection("orders", ref =>
      ref.orderBy("id")
    );
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
  addOrder(
    orderID: string,
    customerEmail: string,
    customerName: string,
    customerPhone: number,
    customerTaxCode: string,
    customerAddress: string,
    customerCity: string,
    customerDistrict: string,
    customerWard: string,
    totalCost: number,
    currentCost: number,
    createdDate: Date,
    description: string
  ) {
    this.angularFirestore.collection("orders").doc(orderID).set({
      id: orderID,
      customerEmail: customerEmail,
      customerName: customerName,
      customerPhone: customerPhone,
      customerTaxCode: customerTaxCode,
      customerAddress: customerAddress,
      customerCity: customerCity,
      customerDistrict: customerDistrict,
      customerWard: customerWard,
      totalCost: totalCost,
      currentCost: currentCost,
      createdDate: createdDate,
      description: description
    });
  }
  addOrderProducts(orderID: string, product: Phone) {
    var productsOrderRef = (this.orderCol = this.angularFirestore
      .collection("orders")
      .doc(orderID)
      .collection("products"));

    productsOrderRef
      .doc(product.id)
      .set({
        id: product.id,
        name: product.name,
        quantity: product.qtyinCart,
        color: product.selectedColor,
        price: product.price,
        sale_price: product.sale_price,
        thumb: product.thumb
      })
      .then(function() {
        console.log("Product Added ");
        window.location.href = "/buy-successful/" + orderID;
      })
      .catch(function(error) {
        console.error("Error adding product: ", error);
      });
  }

  /** GET order by id. Will 404 if id not found */
  getOrder(id: string): Observable<Order> {
    this.orderDoc = this.angularFirestore.doc(
      "orders/" + id
    );
    this.orders$ = this.orderDoc.valueChanges();
    return this.orders$.pipe(
      tap(_ => this.log(`fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    );
  }
  getProductsOrder(orderID: string): Observable<Phone[]> {
    this.phoneCol = this.angularFirestore.collection("orders").doc(orderID).collection("products");
    this.phonePosts = this.phoneCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Phone;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.phonePosts.pipe(
      tap(phone => this.log(`fetched items`)),
      catchError(this.handleError("getProductsOrder", []))
    );
  }
  setCurrentPosition(order: Order) {
    this.observableLocation = this.getPlaceWithObservable(
        order.customerAddress +
        ", "+order.customerCity +
        ", "+order.customerDistrict +
        ", "+order.customerWard +
        ", Vietnam"
    );
    return this.observableLocation;
  }

  getPlaceWithObservable(address: string): Observable<any> {
    var url =
      "http://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "&sensor=false";
    return this.http.get(url).catch(this.handleErrorObservable);
  }

  handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
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
