import { Component, OnInit, ViewChild } from '@angular/core';
import { PhoneService } from '../services/phone.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Location } from '@angular/common';
import { MockDataService } from '../services/mock-data.service';
import { City } from '../city';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [
    './checkout.component.css'
  ]
})
export class CheckoutComponent implements OnInit {
  cities: City[] = [];
  districts: Observable<City[]>;
  @ViewChild('customerEmail') customerEmail: any;
  @ViewChild('customerName') customerName: any;
  @ViewChild('customerPhone') customerPhone: any;
  @ViewChild('customerAddress') customerAddress: any;
  @ViewChild('customerCity') customerCity: any;
  @ViewChild('customerDistrict') customerDistrict: any;
  @ViewChild('customerWard') customerWard: any;

  formElement=[this.customerEmail, this.customerName, this.customerPhone, 
    this.customerAddress, this.customerCity, this.customerDistrict, this.customerWard];
  constructor(
    private phoneService: PhoneService,
    private route: ActivatedRoute,
    public location: Location, 
    private cartService: CartService,
    private mockDataService: MockDataService
  ) { }

  ngOnInit() {
    //this.getCities();
  }

  validateForm(){
    this.formElement.forEach(element => {
      if(element.invalid && (element.dirty || element.touched)){
        if(element.errors.required || (element.errors && element.errors.pattern)){
        alert("Vui lòng kiểm tra lại thông tin");
        }
      }
    else{
      alert("good to go!");
    }
    });
  }

  getCities(){
    this.mockDataService.getCities().subscribe(cities => this.cities = cities);
    //console.log(this.cities);
  }
  getDistricts(city: string){
    console.log(city);
    this.districts = this.mockDataService.getDistricts(city);
    console.log(this.districts);
  }

}
