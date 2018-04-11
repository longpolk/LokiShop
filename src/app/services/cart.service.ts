import { Injectable } from '@angular/core';
import { Phone } from '../phone';
import { PhoneService } from './phone.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CartState } from '../CartState';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CartService {
  constructor(
    private httpclient : HttpClient,
    private phoneService: PhoneService
  ) {}
  private cartSubject = new Subject<CartState>();
    Products : Phone[]= [];
    CartState = this.cartSubject.asObservable();
    addProduct(_product:any) {
      console.log('in service');
      this.Products.push(_product)
      this.cartSubject.next(<CartState>{loaded: true, products:  this.Products});
    }
    removeProduct(id: string) {
      this.Products = this.Products.filter((_item) =>  _item.id != id )
      this.cartSubject.next(<CartState>{loaded: false , products:  this.Products});
    }

  getAllProducts() : Observable <any> {
    return this.phoneService.getPhones();
  }

}