import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Phone } from "../phone";
import { PhoneService } from "../services/phone.service";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../category";
import { Location } from "@angular/common";
import { Brand } from "../brand";
import { Observable } from "rxjs/Rx";

@Component({
  //encapsulation: ViewEncapsulation.None,
  selector: "app-new-products",
  templateUrl: "./new-products.component.html",
  styleUrls: [
    "./new-products.component.css",
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
export class NewProductsComponent implements OnInit {
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
  constructor(
    private phoneService: PhoneService,
    private route: ActivatedRoute,
    public location: Location
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getAllProducts();
    this.getPhones();
    this.getLaptops();
    this.getAccessories();
    this.getBrandName();
  }
  getCategories() {
    this.phoneService
      .getCategories()
      .subscribe(categories => (this.categories = categories));
  }
  getAllProducts() {
    this.phones$ = this.phoneService.getPhones();
      this.laptops$ = this.phoneService.getLaptops();
    Observable.merge(
      this.phones$, this.laptops$
    ).subscribe(products => (this.products = products));
  }
  getPhones(): void {
    this.phoneService.getPhones().subscribe(phones => (this.phones = phones));
  }
  getLaptops(): void {
    this.phoneService
      .getLaptops()
      .subscribe(laptops => (this.laptops = laptops));
  }
  getAccessories() {
    this.phoneService
      .getAccessories()
      .subscribe(accessories => (this.accessories = accessories));
  }
  getBrandName() {
    this.phoneService.getBrands().subscribe(brands => (this.brands = brands));
  }
}
