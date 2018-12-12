import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";
import { User } from "../user";
import { MessageService } from "./messages.service";
import { Md5 } from "ts-md5/dist/md5";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import "rxjs/add/operator/map";
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class UserService {
  public UserUrl = "api/Users"; // URL to web api
  postsCol: AngularFirestoreCollection<User[]>;
  postDoc: AngularFirestoreDocument<User>;
  posts: any;
  post: Observable<User>;
  constructor(
    public http: HttpClient,
    private messageService: MessageService,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {}

  /** GET heroes from the server */
  getUsers(): Observable<User[]> {
    this.postsCol = this.angularFirestore.collection("users");
    this.posts = this.postsCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.posts.pipe(
      tap(User => this.log(`fetched User`)),
      catchError(this.handleError("getUsers", []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.UserUrl}/?id=${id}`;
    return this.http.get<User[]>(url).pipe(
      map(Users => Users[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} User id=${id}`);
      }),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /** Get list of blocked users */
  getBlockedUsers(): Observable<User[]>{
    this.postsCol = this.angularFirestore.collection(
      "users",
      ref => ref.where("active","==",false)
    );
    this.posts = this.postsCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.posts.pipe(
      tap(blockedUsers => this.log(`fetched blocked users`)),
      catchError(this.handleError("getBlockedUsers", []))
    );
  }


  /** GET hero by id. Will 404 if id not found */
  getUser(id: string): Observable<User> {
    this.postDoc = this.angularFirestore.doc("users/" + id);
    this.post = this.postDoc.valueChanges();
    return this.post.pipe(
      tap(_ => this.log(`fetched User id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }
  /**UPDATE user by id or email */
  updateUser(user: User){
    this.angularFirestore.collection("users").doc(user.email).update({
      id: user.email,
      name: user.name,
      active: true,
      orderIDs: new Array<string>(),
      lastLoginDate: new Date(),
      role: "customer"
    }
    );
  }
  /** Login user */
  userLogin(id: string, password: string) {
    let hash = Md5.hashStr(password);
    this.angularFirestore
      .collection("users")
      .doc(id)
      .ref.get()
      .then(function(doc) {
        if (doc.exists && doc.data()["password"] == hash) {
          if(doc.data()["role"] == "admin"){
          window.location.href = '/';
          }else{
            window.location.href = '/';
          }
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
          alert("Email hoặc mật khẩu chưa đúng");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }
  /** Signup user */
  userSignup(uid: string, name: string, email: string, password: string){
    let hash = Md5.hashStr(password);
    this.angularFirestore.collection("users").doc(uid).set({
        id: uid,
        email: email,
        password: hash,
        name: name,
        active: true,
        role: "customer",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/lokishop-2018.appspot.com/o/API%2Fimages%2FNoavatar.jpg?alt=media&token=4767f2cb-eb0d-4703-8423-7112a91b434f",
        registeredDate: new Date(),
        orderIDs: new Array<string>()
    });
  }

  /** DELETE: delete the user from the server */
  blockUser(user: User){
    this.angularFirestore.collection("users")
    .doc(user.id).update({
      active: false
    }
    )
    .then( t => {
      console.log("User Blocked ");
      this.router.navigate(['/admin/customers']);
    })
    .catch(function (error) {
      console.error("Error blocking user: ", error);
    });
  }
  unblockUser(user: User){
    this.angularFirestore.collection("users")
    .doc(user.id).update({
      active: true
    }
    )
    .then( t => {
      console.log("User Unblocked ");
      this.router.navigate(['/admin/customers']);
    })
    .catch(function (error) {
      console.error("Error unblocking user: ", error);
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
