import { Component, OnInit, Input, AfterContentInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Phone } from '../../phone';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PhoneService } from '../../services/phone.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartService } from '../../services/cart.service';
import { Brand } from '../../brand';
import { Category } from '../../category';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css',
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
export class ProductUpdateComponent implements OnInit {
  @Input() phone: Phone;
  @Input() brands: Brand[];
  @Input() categories: Category[];
  public enabled: number;
  constructor(private route: ActivatedRoute,
    private phoneService: PhoneService,
    private location: Location,
    private cartService: CartService) { }

  ngOnInit() {
    this.getPhone();
    this.enabled = 1;
    this.getCategories();
    this.getBrands();
  }
  getPhone(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.phoneService
        .getPhone(id)
        .subscribe(_ => this.phone = _)
    });
  }
  getBrands(): void{
    this.phoneService.getBrands().subscribe(_ => this.brands = _);
  }
  getCategories(): void{
    this.phoneService.getCategories().subscribe(_ => this.categories = _);
  }
  goBack(): void {
    this.location.back();
  }
  update(): void {
    alert("hello!");
    //this.phoneService.updatePhone(this.phone, category);
  }

}
