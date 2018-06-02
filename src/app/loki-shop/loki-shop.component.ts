import { Component, OnInit } from '@angular/core';
import { Phone } from '../phone';
import { PhoneService } from '../services/phone.service';
@Component({
  selector: 'app-loki-shop',
  templateUrl: './loki-shop.component.html',
  styleUrls: ['./loki-shop.component.css']
})
export class LokiShopComponent implements OnInit {
  phones: Phone[];

  constructor(private phoneService: PhoneService) { }
  getPhones(): void{
	  this.phoneService.getPhones().subscribe(phones => this.phones = phones);
  }
  ngOnInit() {
	  this.getPhones();
  }
  

}
