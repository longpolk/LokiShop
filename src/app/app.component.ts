import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo 01';

  public collection: AngularFirestoreCollection<any>;
  public items: Observable<any[]>;
  public phones: any[];
  constructor( angularFirestore: AngularFirestore ) {
    this.collection = angularFirestore.collection('phones');
    this.items = this.collection.valueChanges();
    console.log( 'Connected!' );
    this.items.subscribe(data => {
      console.log(data);
      this.phones = data;
    });
  }
}
