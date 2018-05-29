import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { Phone } from "../../phone";
import { PhoneService } from "../../services/phone.service";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../../category";
import { Location } from "@angular/common";
import { Brand } from "../../brand";
import { Observable } from "rxjs/observable";
import { concat } from "rxjs/observable/concat";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css',
  "../base.scss.css",
    "../responsive.scss.css",
    "../bootstrap.css",
    "../themify-icons.css",
    "../bootstrap.min.css",
    "../font-awesome.min.css",
    "../style.scss.css",
    "../module.scss.css",
    "../bpr-products-module.css"
]
})
export class ProductsComponent implements OnInit {
  categories: Category[] = [];
  products: Phone[] = [];
  phones: Phone[] = [];
  laptops: Phone[] = [];
  accessories: Phone[] = [];
  phoneAccessories: Phone[] = [];
  laptopAccessories: Phone[] = [];
  brands: Brand[] = [];
  load: boolean;
  phones$: Observable<Phone[]>;
  laptops$: Observable<Phone[]>;
  products$: Observable<Phone[]>;
  accessories$: Observable<Phone[]>;
  filteredList: Phone[] = [];
  constructor(
    private phoneService: PhoneService,
    private route: ActivatedRoute,
    public location: Location
  ) { }

  ngOnInit() {
    this.products = this.getAllProducts();
  }
  getAllProducts(): Phone[] {
    let products = [];
    this.phoneService.getPhones().subscribe(data => {
      data.forEach(element => {
        products.push(element);
      });
    });
    this.phoneService.getLaptops().subscribe(data => {
      data.forEach(element => {
        products.push(element);
      });
    });
    this.phoneService.getAccessories().subscribe(data => {
      data.forEach(element => {
        products.push(element);
      });
    });
    console.log(products);
    return products;
  }

}
