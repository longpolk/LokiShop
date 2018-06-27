import { Component, OnInit, Input, AfterContentInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Phone } from '../phone';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PhoneService } from '../services/phone.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartService } from '../services/cart.service';
import { Category } from '../category';


declare var Jarallax: any;
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: [
    './phone-detail.component.css',
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
export class PhoneDetailComponent implements OnInit {

  @Input() phone: Phone;
  @Input() mainImageUrl: string;
  @ViewChild('selectedColor') selectedColor: any;
  @ViewChild('qty') qtyinCart: any;
  category: Category[];
  constructor(
    private route: ActivatedRoute,
    private phoneService: PhoneService,
    private location: Location,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    //this.getPhone();
	this.start();
	//this.getCategory(this.phone.id);
  }
  setImage(imageUrl: string) {
    this.mainImageUrl = imageUrl;
    document.getElementById('zoom_01').setAttribute('src', this.mainImageUrl);
  }
  getPhone(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.phoneService
        .getPhone(id)
        .subscribe(_ => this.phone = _)
    });
  }
  goBack(): void {
    this.location.back();
  }
  getCategory(id: string){
    this.phoneService.getCategoryByID(id).subscribe(_ => this.category = _)
  }
  start(){
	  this.getPhone().then(function () {
      this.getCategory(this.phone.id);
    })
    .catch(function (error) {
      console.error("Error logging: ", error);
    });
  }
  public addToCart(product: Phone) {
    var index = this.cartService.checkExistItems(product.id);
    console.log(this.category[0]);
    product.category = this.category[0].id;
    product.index = index;
    product.selectedColor = this.selectedColor.nativeElement.value;
    product.qtyinCart = parseInt(this.qtyinCart.nativeElement.value); 
    this.cartService.addToCart(product);
    console.log(product);
  }

}
