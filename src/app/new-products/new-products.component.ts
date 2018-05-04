import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Phone } from "../phone";
import { PhoneService } from "../services/phone.service";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../category";
import { Location } from "@angular/common";
import { Brand } from "../brand";
import { Observable } from "rxjs/observable";
import { concat } from "rxjs/observable/concat";

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
    this.getAllProducts();
    //this.getPhones();
    //this.getLaptops();
    //this.getAccessories();
    this.getBrandName();
  }
  getCategories() {
    this.phoneService
      .getCategories()
      .subscribe(categories => (this.categories = categories));
  }
  getAllProducts() {
    //let products = new Array<Phone>();
    this.phoneService.getPhones().subscribe(data => {
      data.forEach(element => {
        this.products.push(element);
      });
    });
    this.phoneService.getLaptops().subscribe(data => {
      data.forEach(element => {
        this.products.push(element);
      });
    });
    this.phoneService.getAccessories().subscribe(data => {
      data.forEach(element => {
        this.products.push(element);
      });
    });
  }
  filterCategories(catID: string) {
    //this.filteredList = this.getAllProducts();
    //var filter = document.getElementById("filter-"+catID.toString);
    //if(filter.getAttribute("checked") == "true"){
    this.filteredList = this.products.filter(
      (product: Phone) => product["data"]["category_id"] == catID
    );
  //}
    this.products = this.filteredList;
    console.log(catID);
    console.log(this.products);
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
