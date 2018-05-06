import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { Phone } from "../phone";
import { PhoneService } from "../services/phone.service";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../category";
import { Location } from "@angular/common";
import { Brand } from "../brand";
import { Observable } from "rxjs/observable";
import { concat } from "rxjs/observable/concat";

@Component({
  selector: "app-popular-products",
  templateUrl: "./popular-products.component.html",
  styleUrls: [
    "./popular-products.component.css",
    "/base.scss.css",
    "./responsive.scss.css",
    "./bootstrap.css",
    "./themify-icons.css",
    "./bootstrap.min.css",
    "./font-awesome.min.css",
    "./style.scss.css",
    "./module.scss.css",
    "./bpr-products-module.css"
  ]
})
export class PopularProductsComponent implements OnInit {
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
  ) {}

  ngOnInit() {
    this.getCategories();
    this.products = this.getAllProducts();
    this.getBrandName();
  }

  getCategories() {
    this.phoneService
      .getCategories()
      .subscribe(categories => (this.categories = categories));
  }
  getAllProducts(): Phone[] {
    let products = [];
    this.phoneService.getPopularPhones().subscribe(data => {
      data.forEach(element => {
        products.push(element);
      });
    });
    this.phoneService.getPopularLaptops().subscribe(data => {
      data.forEach(element => {
        products.push(element);
      });
    });
    this.phoneService.getPopularAccessories().subscribe(data => {
      data.forEach(element => {
        products.push(element);
      });
    });
    console.log(products);
    return products;
  }
  filterCategories(catID: string) {
    //this.filteredList = this.getAllProducts();
    var filter = document
      .getElementById("filter-" + catID)
      .getAttribute("checked");
    if (filter == "true") {
      this.filteredList = this.products.filter(
        (product: Phone) => product["data"]["category_id"] == catID
      );
    }
    if (this.products == this.getAllProducts()) {
      this.products = this.filteredList;
    } else {
      this.products = this.products.concat(this.filteredList);
    }
    console.log(catID);
    console.log(this.products);
  }
  getBrandName() {
    this.phoneService.getBrands().subscribe(brands => (this.brands = brands));
  }
}
