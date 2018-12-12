import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
//import * as admin from 'firebase-admin';
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
  id?: string;
  orderIDs?: Array<string>;
  active?: boolean;
}

@Injectable()
export class AuthService {
  user: Observable<User>;
  check: boolean;
  isSuperAdmin: boolean;
  token: string;
  blockedUsers: String[] = [];
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
        if (user.email == "admin@lokishop.com") {
          this.isSuperAdmin = true;
        }
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
      if (this.blockedUsers.includes(credential.user.email)) {
        alert("Tài khoản này đã bị khóa, vui lòng liên hệ nhóm hỗ trợ để biết thêm thông tin!");
        this.signOut();
      }
      else {
        this.updateGoogleUserData(credential.user);
        //this.router.navigate(["/account/login"]);
      }
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

    userRef.valueChanges().subscribe(res => {
      if (res) {
        const data: googleUser = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL
        };
        return userRef.set(data, { merge: true });
      }else{
        const data: googleUser = {
          uid: user.uid,
          id: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          active: true,
          orderIDs: new Array<string>()
        };
        return userRef.set(data, { merge: true });
      }
    });
  }

  signOut() {
    this.check = false;
    this.isSuperAdmin = false;
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/account/login"]);
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
        switch (error.code) {
          case 'auth/email-already-in-use': alert("Email này đã được sử dụng, vui lòng chọn email khác"); break;
          case 'auth/weak-password': alert("Mật khẩu phải có ít nhất 6 kí tự"); break;
          case 'auth/invalid-email': alert("Email không hợp lệ"); break;
          case 'auth/operation-not-allowed': alert("Tài khoản này đã bị khóa, vui lòng liên hệ Admin. hotline: 0962970238"); break;
          case 'auth/argument-error': alert("Mật khẩu chỉ được bao gồm chữ và số"); break;
        }
      });
  }

  /*deleteUser(uid: string){
    admin.auth().deleteUser(uid)
    .then(t => {
      console.log("Successfully deleted user");
    })
    .catch(function(error) {
      console.log("Error deleting user:", error);
    });
  }*/

  getBlockedUsers() {
    this.userService.getBlockedUsers().subscribe(data => {
      data.forEach(element => {
        this.blockedUsers.push(element["data"].email);
      });
    });
  }
}
