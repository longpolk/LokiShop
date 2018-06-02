import { Injectable } from '@angular/core';
import {
  AngularFireStorage, AngularFireUploadTask
} from "angularfire2/storage";
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Phone } from '../phone';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {
  file: any;
  path: any;
  uploadTask: AngularFireUploadTask;
  snapshot: Observable<any>;


  constructor(private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore
  ) { }

  startUpload(event: FileList) {
    
    // The File object
    this.file = event.item(0)

    // Client-side validation example
    if (this.file.type.split('/')[0] !== 'image') {
      console.error('Định dạng file không hỗ trợ :( ')
      return;
    }

    // The storage path
    this.path = `phones/${new Date().getTime()}_${this.file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'LokiShop' };
    // The main task
    this.uploadTask = this.angularFireStorage.upload(this.path, this.file, { customMetadata });
    

    console.log("uploaded! ");
    // Progress monitoring
    //this.percentage = this.task.percentageChanges();
    //this.snapshot   = this.task.snapshotChanges()

    // The file's download URL
    //this.downloadURL = this.task.downloadURL(); 
  }
  changeThumb(phone: Phone, category: string, thumb: string) {
    if(category == 'phone' || category == 'laptop'){
      category = category+"s";
    }
    var list = '';
    if(category == 'accessories'){
      list = category+"-list";
    }else{
      list = category.replace(category[category.lastIndexOf('s')], '') + "-list";
    }
    console.log(list + " - " + phone.id);
    this.angularFirestore
      .collection("category").doc(category).collection(list).doc(phone.id)
      .update({
        "thumb": thumb
      });
  }
  addImageUrl(phone: Phone, category: string, url: string) {
    var images = phone.imageUrl;
    images.push(url);
    if(category == 'phone' || category == 'laptop'){
      category = category+"s";
    }
    var list = '';
    if(category == 'accessories'){
      list = category+"-list";
    }else{
      list = category.replace(category[category.lastIndexOf('s')], '') + "-list";
    }
    console.log(list + " - " + phone.id);
    this.angularFirestore
      .collection("category").doc(category).collection(list).doc(phone.id)
      .update({
        "imageUrl": images
      });
  }
  deleteImageUrl(phone: Phone, category: string, url: string){
    var images = phone.imageUrl;
    const itemsWithoutRemoved = images.filter(_ => _ !== url);
    images = itemsWithoutRemoved;
    var list = category.replace(category[category.lastIndexOf('s')], '') + "-list";
    console.log(list + " - " + phone.id);
    this.angularFirestore
      .collection("category").doc(category).collection(list).doc(phone.id)
      .update({
        "imageUrl": images
      });
  }
}
