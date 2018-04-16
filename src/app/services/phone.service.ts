import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";
import { Phone } from "../phone";
import { Laptop } from "../laptop";
import { MessageService } from "./messages.service";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import "rxjs/add/operator/map";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class PhoneService {
  public phoneUrl = "api/phones"; // URL to web api
  
  phoneCol: AngularFirestoreCollection<Phone[]>;
  accessoriesCol: AngularFirestoreCollection<Phone[]>;
  laptopCol: AngularFirestoreCollection<Laptop[]>;
  postDoc: AngularFirestoreDocument<Phone>;
  phonePosts: any;
  laptopPosts: any;
  accessoriesPosts: any;
  masterPosts: Observable<Phone[]>;
  post: Observable<Phone>;
  posts: Observable<Phone[]>;
  listPhone: Phone[] = [];
  phones: Phone[] = [];
  mainImageUrl: string;
  constructor(
    public http: HttpClient,
    private messageService: MessageService,
    private angularFirestore: AngularFirestore
  ) {}
  /** Set main image of product in product-detail */
  setImage(imageUrl: string) {
    this.mainImageUrl = imageUrl;
  }
  /** GET heroes from the server */
  getPhones(): Observable<Phone[]> {
    this.phoneCol = this.angularFirestore.collection(
      "category/phones/phone-list", ref => ref.orderBy("postDate", "desc")
    );
    this.phonePosts = this.phoneCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Phone;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.phonePosts.pipe(
      tap(phone => this.log(`fetched phone`)),
      catchError(this.handleError("getPhones", []))
    );
  }
  getPhones_2(): any {
    this.getPhones().subscribe(phones => (this.phones = phones.slice(0, 10)));
    this.phones.forEach(phone => {
      this.listPhone.push(
        new Phone(
          phone.brand,
          phone.category_id,
          phone.colors,
          phone.id,
          phone.imageUrl,
          phone.inStock,
          phone.name,
          phone.postDate,
          phone.price,
          phone.sale_price,
          phone.snippet,
          phone.sold,
          phone.thumb,
          phone.added
        )
      );
    });
    return this.listPhone;
  }
  getLaptops(): Observable<Phone[]> {
    this.laptopCol = this.angularFirestore.collection(
      "category/laptops/laptop-list", ref => ref.orderBy("postDate", "desc")
    );
    this.laptopPosts = this.laptopCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Phone;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.laptopPosts.pipe(
      tap(phone => this.log(`fetched laptop`)),
      catchError(this.handleError("getLaptops", []))
    );
  }
  getAccessories(): Observable<Phone[]> {
    this.laptopCol = this.angularFirestore.collection(
      "category/accessories/accessories-list"
    );
    this.laptopPosts = this.laptopCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Phone;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.laptopPosts.pipe(
      tap(phone => this.log(`fetched accessories`)),
      catchError(this.handleError("getAccessories", []))
    );
  }
  getBanners(): Observable<Phone[]> {
    this.laptopCol = this.angularFirestore.collection(
      "banners/slider-banners/list"
    );
    this.laptopPosts = this.laptopCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Phone;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.laptopPosts.pipe(
      tap(phone => this.log(`fetched banners`)),
      catchError(this.handleError("getBanners", []))
    );
  }
  getSliders(): Observable<Phone[]> {
    this.laptopCol = this.angularFirestore.collection(
      "banners/sliders/list"
    );
    this.laptopPosts = this.laptopCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Phone;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.laptopPosts.pipe(
      tap(phone => this.log(`fetched sliders`)),
      catchError(this.handleError("getSliders", []))
    );
  }
  getLaptopAccessories(): Observable<Phone[]> {
    this.laptopCol = this.angularFirestore.collection(
      "category/accessories/accessories-list", ref => ref.where("tag","==","laptops")
    );
    this.laptopPosts = this.laptopCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Phone;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.laptopPosts.pipe(
      tap(phone => this.log(`fetched accessories`)),
      catchError(this.handleError("getAccessories", []))
    );
  }
  getPhoneAccessories(): Observable<Phone[]> {
    this.laptopCol = this.angularFirestore.collection(
      "category/accessories/accessories-list", ref => ref.where('tag','==','phones')
    );
    this.laptopPosts = this.laptopCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Phone;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.laptopPosts.pipe(
      tap(phone => this.log(`fetched successfull`)),
      catchError(this.handleError("getPhoneAccessories", []))
    );
  }
  getDiscountProduct(): Observable<Phone[]> {
    var currentDay = new Date();

    this.phoneCol = this.angularFirestore.collection(
      "category/phones/phone-list", ref => ref.where("sold","==",0).orderBy("postDate", "desc")
    );
    this.phonePosts = this.phoneCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Phone;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });


    this.laptopCol = this.angularFirestore.collection(
      "category/laptops/laptops-list", ref => ref.where("postDate","<",currentDay).orderBy("postDate", "desc")
    );
    this.laptopPosts = this.laptopCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Phone;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });


    this.accessoriesCol = this.angularFirestore.collection(
      "category/accessories/accessories-list", ref => ref.where("postDate","<",currentDay).orderBy("postDate", "desc")
    );
    this.accessoriesPosts = this.accessoriesCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Phone;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
/** Join all the observable into masterPosts */
    /*this.masterPosts = Observable.of(this.phonePosts).merge(Observable.of(this.laptopPosts))
    .merge(Observable.of(this.accessoriesPosts));*/
    this.masterPosts = this.phonePosts;

    return this.masterPosts.pipe(
      tap(phone => this.log(`fetched phone`)),
      catchError(this.handleError("getDiscountProduct", []))
    );
  }
  
  /** GET hero by id. Return `undefined` when id not found */
  getPhoneNo404<Data>(id: number): Observable<Phone> {
    const url = 'detail/id=${id}';
    return this.http.get<Phone[]>(url).pipe(
      map(phones => phones[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} phone id=${id}`);
      }),
      catchError(this.handleError<Phone>(`getPhone id=${id}`))
    );
  }

  /** GET phone by id. Will 404 if id not found */
  getPhone(id: string): Observable<Phone> {
    this.postDoc = this.angularFirestore.doc(
      "category/phones/phone-list/" + id
    );
    this.post = this.postDoc.valueChanges();
    return this.post.pipe(
      tap(_ => this.log(`fetched phone id=${id}`)),
      catchError(this.handleError<Phone>(`getPhone id=${id}`))
    );
  }

  /* GET heroes whose name contains search term 
  searchPhone(term: string): Observable<Phone[]> {
    if (!term.trim()) {
      // if not search term, return empty phone array.
      return of([]);
    }
	this.postsCol = this.angularFirestore.collection('posts', ref => ref.where('name', '==', 'Dell Venue'));
	this.posts = this.postsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Phone;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
	  return this.posts
	  .pipe(
      tap(_ => this.log(`found phones matching "${term}"`)),
      catchError(this.handleError<Phone[]>('searchPhones', []))
    );
    /*return this.http.get<Phone[]>(`api/phones/?name=${term}`).pipe(
      tap(_ => this.log(`found phones matching "${term}"`)),
      catchError(this.handleError<Phone[]>('searchPhones', []))
    );
  }*/

  //////// Save methods //////////

  /** POST: add a new hero to the server 
  addPhone (phone: Phone): Observable<Phone> {
    return this.http.post<Phone>(this.phoneUrl, phone, httpOptions).pipe(
      tap((phone: Phone) => this.log(`added phone w/ id=${phone.id}`)),
      catchError(this.handleError<Phone>('addPhone'))
    );
  }*/
  addPhone(
    id: string,
    name: string,
    age: number,
    image: string,
    snippet: string
  ) {
    this.angularFirestore
      .collection("phones")
      .add({ age: age, id: id, imageUrl: image, name: name, snippet: snippet });
  }

  /** DELETE: delete the hero from the server */
  deletePhone(phone: Phone | number): Observable<Phone> {
    const id = typeof phone === "number" ? phone : phone.id;
    const url = `${this.phoneUrl}/${id}`;

    return this.http
      .delete<Phone>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted phone id=${id}`)),
        catchError(this.handleError<Phone>("deletePhone"))
      );
  }

  /** PUT: update the hero on the server */
  updatePhone(phone: Phone): Observable<any> {
    return this.http
      .put(this.phoneUrl, phone, httpOptions)
      .pipe(
        tap(_ => this.log(`updated phone id=${phone.id}`)),
        catchError(this.handleError<any>("updatePhone"))
      );
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
