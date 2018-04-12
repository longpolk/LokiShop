import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Phone } from './phone';
import { CartService } from './services/cart.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public shoppingCartItems$: Observable<Phone[]>;

  constructor(
    private route: ActivatedRoute,
    public location: Location, 
    private cartService: CartService) {

    this.shoppingCartItems$ = this.cartService.getItems();
    this.shoppingCartItems$.subscribe(_ => _);
    
    console.log(this.shoppingCartItems$);
  }
  
  ngOnInit(): void { }
}
