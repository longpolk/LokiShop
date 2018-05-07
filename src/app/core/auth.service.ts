import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import * as firebase from "firebase/app";
/*import {
  AngularFireDatabase,
  FirebaseAuthState,
  AuthProviders,
  AuthMethods,
  AngularFire
} from "angularfire2";*/
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import { FirebaseAuth } from "@firebase/auth-types";
import { User } from "../user";

interface googleUser {
  uid: string;
  email: string;
  photoURL?: string;
  name?: string;
  orderIDs?: Array<string>;
}

@Injectable()
export class AuthService {
  normalUser: Observable<User>;
  user: Observable<googleUser>;
  constructor(
    private afAuth: AngularFireAuth,
    //private af: AngularFire,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.doc<googleUser>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: googleUser = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/"]);
    });
  }
  
  emailSignUp(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => console.log("success"))
      .catch(error => console.log(error));
  }
 /*
  emailLogin(credentials: User): firebase.Promise<FirebaseAuthState> {
     return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
       { provider: AuthProviders.Password,
         method: AuthMethods.Password
        })
       .then(() => console.log("success"))
       .catch(error => console.log(error));
  }*/
}
