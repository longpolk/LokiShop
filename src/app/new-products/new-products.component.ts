import { Component, OnInit } from "@angular/core";
import { Phone } from "../phone";
import { PhoneService } from "../services/phone.service";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../category";
import { Location } from "@angular/common";
import { Brand } from "../brand";

@Component({
  selector: "app-new-products",
  templateUrl: "./new-products.component.html",
  styleUrls: [
    "./new-products.component.css",
    "/base.scss.css",
    "./responsive.scss.css",
    "./bootstrap.css",
    "./themify-icons.css",
    "./bootstrap.min.css",
    './font-awesome.min.css',
    "./style.scss.css",
    "./module.scss.css",
    "./bpr-products-module.css"
  ]
})
export class NewProductsComponent implements OnInit {
  categories: Category[] = [];
  phones: Phone[] = [];
  laptops: Phone[] = [];
  accessories: Phone[] = [];
  phoneAccessories: Phone[] = [];
  laptopAccessories: Phone[] = [];
  brands: Brand[] = [];
  load: boolean;
  constructor(
    private phoneService: PhoneService,
    private route: ActivatedRoute,
    public location: Location
  ) {}

  ngOnInit() {
    this.getCategories();
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
