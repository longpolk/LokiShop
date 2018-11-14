import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhoneService } from '../services/phone.service';
import { CartService } from '../services/cart.service';
import { Phone } from '../phone';
import { query } from '@angular/core/src/render3/instructions';
import { Brand } from '../brand';
import { Observable } from 'rxjs';
import { Category } from '../category';
import { Location } from "@angular/common";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css',
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
export class SearchComponent implements OnInit {
  @Input() phones: Phone[];
  categories: Category[] = [];
  products: Phone[] = [];
  //phones: Phone[] = [];
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
    private route: ActivatedRoute,
    private phoneService: PhoneService,
    private location: Location,
    private cartService: CartService
  ) { }

  ngOnInit() {
    //this.getCategories();
    this.products = this.getAllProducts();
    //this.getBrandName();
  }
  searchPhones(): void {
    this.route.params.subscribe(params => {
      //const cat = params['cat'];
      const q = params['q'];
      this.phoneService
        .searchPhones(q)
        .subscribe(_ => this.phones = _)
    });
  }
  getCategories() {
    this.phoneService
      .getCategories()
      .subscribe(categories => (this.categories = categories));
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
    return products;
  }
  filterCategories(catID: string) {
    //this.filteredList = this.getAllProducts();
    var filter = document.getElementById("filter-"+catID).getAttribute("checked");
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
