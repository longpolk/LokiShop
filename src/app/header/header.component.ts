import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Phone } from '../phone';
import { CartService } from '../services/cart.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './LokiShop-2018_files/bootstrap.min.css',
	'./LokiShop-2018_files/font-awesome.min.css',
	'./LokiShop-2018_files/owl.carousel.min.css',
	'./LokiShop-2018_files/base.scss.css',
	'./LokiShop-2018_files/style.scss.css',
	'./LokiShop-2018_files/update.scss.css',
	'./LokiShop-2018_files/module.scss.css',
	'./LokiShop-2018_files/responsive.scss.css',
  './LokiShop-2018_files/update_stylesheets.scss.css',
  './LokiShop-2018_files/css.css',
  './LokiShop-2018_files/menu-stylesheets.scss.css',
  './LokiShop-2018_files/popup-cart.scss.css']
})
export class HeaderComponent implements OnInit {
  public shoppingCartItems$: Observable<Phone[]>;
  public shoppingCartItems_local$: Observable<Phone[]>;
  @Input() public queryString: string;
  
  constructor(
    private route: ActivatedRoute,
    public location: Location, 
    private cartService: CartService,
    public auth: AuthService
  ) {
    this.shoppingCartItems$ = this.cartService.getItems();
    this.shoppingCartItems$.subscribe(_ => _);
    
    //console.log(this.shoppingCartItems$);
    //this.shoppingCartItems_local$ = this.cartService.getItemslocal();
    //this.shoppingCartItems_local$.subscribe(_ => _);

    
    //console.log(this.shoppingCartItems_local$);
  }

  ngOnInit() {
  
  }

}
