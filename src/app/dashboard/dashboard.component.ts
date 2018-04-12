import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Phone } from '../phone';
import { PhoneService } from '../services/phone.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Laptop } from '../laptop';
import { CartService } from '../services/cart.service';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './dashboard.component.css'
    /*'./LokiShop-2018_files/bootstrap.min.css',
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
  './LokiShop-2018_files/popup-cart.scss.css'*/
]
})

export class DashboardComponent implements OnInit {
  phones: Phone[] = [];
  laptops: Laptop[] = [];
  constructor(
    private phoneService: PhoneService,
    private route: ActivatedRoute,
    public location: Location, 
    private cartService: CartService
  ) { }
 
  ngOnInit() {
    this.getPhones();
  }
 
  getPhones(): void {
    this.phoneService.getPhones()
      .subscribe(phones => this.phones = phones.slice(0, 10));
  }
  getLaptops(): void {
    this.phoneService.getLaptops()
      .subscribe(laptops => this.laptops = laptops.slice(0, 10));
      console.log(this.laptops.length);
  }

  public addToCart(product: Phone) {
    this.cartService.addToCart(product);
  }
}