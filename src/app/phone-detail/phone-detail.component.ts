import { Component, OnInit, Input, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { Phone } from '../phone';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PhoneService } from '../services/phone.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartService } from '../services/cart.service';


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
  constructor(
    private route: ActivatedRoute,
    private phoneService: PhoneService,
    private location: Location,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getPhone();
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
  save(): void {
    this.phoneService.updatePhone(this.phone)
      .subscribe(() => this.goBack());
  }
  public addToCart(product: Phone) {
    this.cartService.addToCart(product);
    //this.router.navigateByUrl('/');
  }

}
