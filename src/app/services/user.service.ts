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
import { AuthService } from "../core/auth.service";

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
    private router: Router,
    public authService: AuthService
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

  /** GET hero by id. Will 404 if id not found */
  getUser(id: string): Observable<User> {
    this.postDoc = this.angularFirestore.doc("users/" + id);
    this.post = this.postDoc.valueChanges();
    return this.post.pipe(
      tap(_ => this.log(`fetched User id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
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
          window.location.href = '/account';
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
  userSignup(email: string): boolean {
    var check = false;
    var usersRef = this.angularFirestore
      .collection("users")
      .doc(email);
        if (usersRef !== null || usersRef !== undefined) {
          check = false;
        } else {
          check = true;
        }
    return check;
  }
  addUser(email: string, name: string, password: string) {
    if (this.userSignup(email) == true) {
      let hash = Md5.hashStr(password);
      this.authService.emailSignUp(email, password);
      this.angularFirestore.collection("users").doc(email).set({
        id: email,
        password: hash,
        name: name,
        active: true,
        role: "customer",
        registeredDate: new Date(),
        orderIDs: new Array<string>()
      })
      .then(function () {
        console.log("User Added ");
        window.location.href = "/";
      })
      .catch(function (error) {
        console.error("Error adding user: ", error);
      });
    }else{
      alert("Email này đã được sử dụng");
    }
  }
  /** DELETE: delete the hero from the server */
  deleteUser(User: User | number): Observable<User> {
    const id = typeof User === "number" ? User : User.id;
    const url = `${this.UserUrl}/${id}`;

    return this.http
      .delete<User>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted User id=${id}`)),
        catchError(this.handleError<User>("deleteUser"))
      );
  }

  /** PUT: update the hero on the server */
  updateUser(User: User): Observable<any> {
    return this.http
      .put(this.UserUrl, User, httpOptions)
      .pipe(
        tap(_ => this.log(`updated User id=${User.id}`)),
        catchError(this.handleError<any>("updateUser"))
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
    this.messageService.add("UserService: " + message);
  }
}
