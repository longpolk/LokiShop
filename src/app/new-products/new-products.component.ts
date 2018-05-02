import { Component, OnInit } from "@angular/core";
import { Phone } from "../phone";
import { PhoneService } from "../services/phone.service";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../category";
import { Location } from "@angular/common";

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
    //'./font-awesome.min.css',
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
  phoneBrands: string[] = [];
  laptopBrands: string[] = [];
  accessoriesBrands: string[] = [];
  brands: string[] = [];
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
    console.log(this.phones);
    this.phones.forEach(phone => {
      this.phoneBrands.push(phone.brand);
    });
    this.laptops.forEach(laptop => {
      this.laptopBrands.push(laptop.brand);
    });
    this.accessories.forEach(accessories => {
      this.accessoriesBrands.push(accessories.brand);
    });
    console.log(this.phoneBrands);
    for (var i = 0; i < this.phoneBrands.length; i++) {
      for (var j = 0; j < this.laptopBrands.length; j++) {
        for (var k = 0; k < this.accessoriesBrands.length; k++) {
          if (
            this.phoneBrands[i] == this.laptopBrands[j] ||
            this.phoneBrands[i] == this.accessoriesBrands[k]
          ) {
            this.phoneBrands.slice(i, 1);
          }
          if (
            this.phoneBrands[i] == this.laptopBrands[j] &&
            this.phoneBrands[i] == this.accessoriesBrands[k]
          ) {
            this.laptopBrands.slice(j, 1);
            this.accessories.slice(k, 1);
          }
        }
      }
    }
    this.brands.concat(this.phoneBrands);
    console.log(this.phoneBrands);
    this.brands.concat(this.laptopBrands);
    console.log(this.laptopBrands);
    this.brands.concat(this.accessoriesBrands);
    console.log(this.accessoriesBrands);
    this.brands.sort;
  }
}
