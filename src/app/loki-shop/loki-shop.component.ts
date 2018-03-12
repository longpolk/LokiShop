import { Component, OnInit } from '@angular/core';
import { Phone } from '../phone';
import { PHONES } from '../mock-phones';
@Component({
  selector: 'app-loki-shop',
  templateUrl: './loki-shop.component.html',
  styleUrls: ['./loki-shop.component.css']
})
export class LokiShopComponent implements OnInit {
  phones = PHONES;
  selectedPhone: Phone;

  constructor() { }

  ngOnInit() {
  }
  onSelect(phone:Phone): void{
    this.selectedPhone = phone;
  }

}
