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

@Injectable()
export class MockDataService {
  cityCol: AngularFirestoreCollection<City[]>;
  postDoc: AngularFirestoreDocument<City>;
  cityPosts: any;
  post: Observable<City>;
  phones: City[] = [];
  constructor(
    private angularFirestore: AngularFirestore
  )
  {}

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
}
