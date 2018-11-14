import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Phone } from '../phone';
import { PhoneService } from '../services/phone.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Laptop } from '../laptop';
import { Category } from '../category';
import { CartService } from '../services/cart.service';
import { Location } from '@angular/common'; 
import { MatDialog, MatDialogRef } from '@angular/material';
import { PopupCartComponent } from '../popup-cart/popup-cart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './dashboard.component.css',
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
  './LokiShop-2018_files/popup-cart.scss.css'
]
})

export class DashboardComponent implements OnInit {
  phones: Phone[] = [];
  laptops: Phone[] = [];
  accessories: Phone[] = [];
  banners: Phone[] = [];
  sliders: Phone[] = [];
  phoneAccessories: Phone[] = [];
  laptopAccessories: Phone[] = [];
  discountProducts: Phone[] = [];
  category: Category[];

  fileNameDialogRef: MatDialogRef<PopupCartComponent>;
  constructor(
    private phoneService: PhoneService,
    private route: ActivatedRoute,
    public location: Location, 
    private cartService: CartService,
    private dialog: MatDialog
  ) { }
 
  ngOnInit() {
    this.getPhones();
    this.getLaptops();
    this.getAccessories();
    this.getBanners();
    this.getSliders();
    this.getLaptopAccessories();
    this.getPhoneAccessories();
    this.getDiscountProduct();
  }
 
  getPhones(): void {
    this.phoneService.getPhones()
      .subscribe(phones => this.phones = phones.slice(0, 8));
  }
  getLaptops(): void {
    this.phoneService.getLaptops()
      .subscribe(laptops => this.laptops = laptops.slice(0, 5));
      //console.log('list laptops: ');
      //console.log(this.laptops);
  }
  getAccessories(){
    this.phoneService.getAccessories()
      .subscribe(accessories => this.accessories = accessories.slice(0, 4));
      //console.log('list accessories: ');
      //console.log(this.accessories);
  }
  getBanners(){
    this.phoneService.getBanners()
      .subscribe(banners => this.banners = banners.slice(0, 2));
      //console.log('list accessories: ');
      //console.log(this.accessories);
  }
  getSliders(){
    this.phoneService.getSliders()
      .subscribe(sliders => this.sliders = sliders.slice(0, 3));
      //console.log('list accessories: ');
      //console.log(this.accessories);
  }
  getPhoneAccessories(){
    this.phoneService.getPhoneAccessories()
    .subscribe(phoneAccessories => this.phoneAccessories = phoneAccessories.slice(0, 3));
  }
  getLaptopAccessories(){
    this.phoneService.getLaptopAccessories()
    .subscribe(laptopAccessories => this.laptopAccessories = laptopAccessories.slice(0, 3));
    //console.log(this.laptopAccessories);
  }
  getDiscountProduct(){
    this.phoneService.getDiscountProduct()
    .subscribe(discountProducts => this.discountProducts = discountProducts.slice(0, 10));
  }
  public addToCart(product: Phone) {
    this.cartService.addToCart(product);
  }
  openPopupCart(){
    this.fileNameDialogRef = this.dialog.open(PopupCartComponent, {
      hasBackdrop: false
    });
  }
}