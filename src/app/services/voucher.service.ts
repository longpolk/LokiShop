import { Injectable } from '@angular/core';
import { Voucher } from '../voucher';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { MessageService } from './messages.service';

@Injectable()
export class VoucherService {

  postsCol: AngularFirestoreCollection<Voucher[]>;
  postDoc: AngularFirestoreDocument<Voucher>;
  posts: any;
  post: Observable<Voucher>;

  constructor(
    private angularFirestore: AngularFirestore,
    private router: Router,
    private messageService: MessageService
  ) { }

  /** GET vouchers from the server */
  getVouchers(): Observable<Voucher[]> {
    this.postsCol = this.angularFirestore.collection("vouchers");
    this.posts = this.postsCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Voucher;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.posts.pipe(
      tap(Voucher => this.log(`fetched Voucher`)),
      catchError(this.handleError("getVouchers", []))
    );
  }

  getVoucher(id: string): Observable<Voucher> {
	this.postDoc = this.angularFirestore
      .collection("vouchers")
      .doc(id);
    this.post = this.postDoc.valueChanges();
    return this.post.pipe(
      tap(_ => this.log(`fetched voucher id=${id}`)),
      catchError(this.handleError<Voucher>(`getVoucher id=${id}`))
    );
  }

  updateVoucher(voucher: Voucher) {
    this.angularFirestore
      .collection("vouchers").doc(voucher.id)
      .update({
        name: voucher.data.name, endDate: voucher.data.endDate,
        discount: voucher.data.discount, expired: voucher.data.expired,
        inStock: voucher.data.inStock, startDate: voucher.data.startDate
      });
  }

  deleteVoucher(voucher: Voucher) {
    this.angularFirestore.collection("vouchers").doc(voucher.id).delete()
    .then( t => {
      console.log("voucher Removed ");
      this.router.navigate(['/admin/discounts']);
    })
    .catch(function (error) {
      console.error("Error removing voucher: ", error);
    });
  }

  addVoucher(voucher: Voucher) {
    this.angularFirestore
      .collection("vouchers").doc(voucher.id)
      .set({
        'id': voucher.id, 'name': voucher.data.name, 'endDate': voucher.data.endDate,
        'discount': voucher.data.discount, 'expired': voucher.data.expired,
        'inStock': voucher.data.inStock,'startDate': new Date()
      }).then(t => {
        console.log("Voucher Added ");
        this.router.navigate(['/admin/discounts']);
      })
      .catch(function (error) {
        console.error("Error adding Voucher: ", error);
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
    this.messageService.add("UserService: " + message);
  }
}
