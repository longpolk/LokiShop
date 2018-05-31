import { Component, OnInit, Input, AfterContentInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Phone } from '../../phone';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PhoneService } from '../../services/phone.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartService } from '../../services/cart.service';
import { Brand } from '../../brand';
import { Category } from '../../category';

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

  @ViewChild("phoneName") phoneName: any;
  @ViewChild("phoneDes") phoneDes: any;
  @ViewChild("phonePrice") phonePrice: any;
  @ViewChild("phoneSalePrice") phoneSalePrice: any;
  @ViewChild("phoneInStock") phoneInStock: any;
  @ViewChild("phoneColors") phoneColors: any;
  @ViewChild("phoneBrand") phoneBrand: any;
  @ViewChild("phoneType") phoneType: any;
  @ViewChild("verify") verifyButton: any;
  @ViewChild("update") updateButton: any;
  categoryName: Category[] = [];

  /*phoneName: string;
  phoneDes: string;
  phonePrice: number;
  phoneSalePrice: number;
  phoneInStock: number;
  phoneColors: Array<string>;
  phoneBrand: string;
  phoneType: string;*/

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
    //this.getCategoryByID();
  }
  getPhone(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.phoneService
        .getPhone(id)
        .subscribe(_ => this.phone = _)
    });
  }
  getBrands(): void {
    this.phoneService.getBrands().subscribe(_ => this.brands = _);
  }
  getCategories(): void {
    this.phoneService.getCategories().subscribe(_ => this.categories = _);
  }
  goBack(): void {
    this.location.back();
  }
  updateForm(
  phoneName: string,
  phoneDes: string,
  phonePrice: number,
  phoneSalePrice: number,
  phoneInStock: number,
  phoneColors: string,
  phoneBrand: string,
  phone: Phone
  ): boolean {
    phone.name = phoneName;
    phone.snippet = phoneDes;
    phone.price = phonePrice;
    phone.sale_price = phoneSalePrice;
    phone.inStock = phoneInStock;
    var list = [];
    var colors = phoneColors.split(",");
    for(var i = 0; i< phoneColors.length; i++){
    list.push(colors[i]);
    }
    phone.colors = list;
    phone.brand = phoneBrand;
    console.log(this.categoryName[0]["data"].name);
    this.phoneService.updatePhone(phone, this.categoryName[0]["data"].name);
    alert("Đã lưu thông tin sản phẩm!");
    return true;
  }

  validateForm(catID: string): boolean {
    var formElement = [
      this.phoneName,
      this.phoneDes,
      this.phonePrice,
      this.phoneSalePrice,
      this.phoneInStock,
      this.phoneColors,
      this.phoneBrand,
      this.phoneType
    ];
    var count = 0;
    for (var i = 0; i < formElement.length; i++) {
      var element = formElement[i];
      if (element.invalid && (element.dirty || element.touched)) {
        if (
          (element.errors && element.errors.pattern)
        ) {
          count++;
        }
        count++;
      }
    }
    if (count !== 0) {
      alert("Lỗi! Vui lòng kiểm tra lại thông tin sản phẩm!");
      return false;
    } else {
      this.verifyButton.nativeElement.hidden = true;
      this.updateButton.nativeElement.hidden = false;
      this.getCategoryByID(catID);
      console.log(catID);
      alert("Thông tin sản phẩm hợp lệ!");
      return true;
    }
  }
  getCategoryByID(id: string){
    this.phoneService.getCategoryByID(id).subscribe(_ => this.categoryName = _);
  }
}
