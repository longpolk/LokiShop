import { Injectable } from '@angular/core';
import { Phone } from '../phone';
import { PhoneService } from './phone.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CartState } from '../CartState';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { of } from 'rxjs/Observable/of';

@Injectable()
export class CartService {
  private itemsInCartSubject: BehaviorSubject<Phone[]> = new BehaviorSubject([]);
  private itemsInCart: Phone[] = [];
  constructor(
    private httpclient: HttpClient,
    private phoneService: PhoneService
  ) {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }
  private cartSubject = new Subject<CartState>();
  Products: Phone[] = [];
  CartState = this.cartSubject.asObservable();
  
  addProduct(_product: any) {
    console.log('in service');
    this.Products.push(_product)
    this.cartSubject.next(<CartState>{ loaded: true, products: this.Products });
  }

  removeProduct(id: string) {
    this.Products = this.Products.filter((_item) => _item.id != id)
    this.cartSubject.next(<CartState>{ loaded: false, products: this.Products });
  }

  getAllProducts(): Observable<any> {
    return this.phoneService.getPhones();
  }

  public addToCart(item: Phone) {
    this.itemsInCartSubject.next([...this.itemsInCart, item]);
  }

  public removeFromCart(item: Phone) {
    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter(_ => _.id !== item.id);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  public getItems(): Observable<Phone[]> {
    return this.itemsInCartSubject;
  }

  public getTotalAmount(): Observable<number> {
    return this.itemsInCartSubject.map((items: Phone[]) => {
      return items.reduce((prev, curr: Phone) => {
        return prev + curr.price;
      }, 0);
    });
  }

}