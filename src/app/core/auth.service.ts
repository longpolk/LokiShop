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
import { UserService } from "../services/user.service";

interface googleUser {
  uid: string;
  email: string;
  photoURL?: string;
  name?: string;
  orderIDs?: Array<string>;
}

@Injectable()
export class AuthService {
  user: Observable<User>;
  check: boolean;
  token: string;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        this.check = true;
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        this.check = false;
        return Observable.of(null);
      }
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  Login(email: string, password: string) {
    return this.normalLogin(email, password);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateGoogleUserData(credential.user);
    });
  }
  private normalLogin(email: string, password: string) {
    console.log("ok");
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        console.log("ok2");
        console.log('auth: authWithPassword success ' + credential.uid)
        //this.updateUserData(credential.uid);
        this.check = true;
        this.user = this.userService.getUser(credential.uid);
      });
  }
  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.collection("users").doc(user);

    const data: User = {
      email: "test",
      password: "test",
      active: true,
      id: user,
      name: "test",
      role: '',
      orderIDs: new Array,
      photoURL: "test"
    };

    return userRef.set(data, { merge: true });
  }
  private updateGoogleUserData(user) {
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
    this.check = false;
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/"]);
    });
  }
  emailSignUp(name: string, email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(credential => {
      console.log(credential.uid);
      this.userService.userSignup(credential.uid, name, email, password);
    })
    .then(function () {
      alert("Tạo tài khoản thành công!");
    })
    .catch(function (error) {
      switch(error.code){
      case 'auth/email-already-in-use': alert("Email này đã được sử dụng, vui lòng chọn email khác"); break;
      case 'auth/weak-password': alert("Mật khẩu phải có ít nhất 6 kí tự"); break;
      case 'auth/invalid-email': alert("Email không hợp lệ"); break;
      case 'auth/operation-not-allowed': alert("Tài khoản này đã bị khóa, vui lòng liên hệ Admin. hotline: 0962970238"); break;
      case 'auth/argument-error': alert("Mật khẩu chỉ được bao gồm chữ và số"); break;
    }
    });
  }
  /*
  addUser(email: string, name: string, password: string) {
    if (this.userSignup(email).isEmpty) {
      let hash = Md5.hashStr(password);
      this.authService.emailSignUp(email, password);
      this.angularFirestore.collection("users").add({
        email: email,
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
}*/
}
