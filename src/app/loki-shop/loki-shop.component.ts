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
  add(id: string, name: string, age: number, image: string, snippet: string): void {
  id = id.trim();
  name = name.trim();
  //age = age.trim();
  image = image.trim();
  snippet = snippet.trim();
  
  if (!name) { return; }
  this.phoneService.addPhone(id, name, age, image, snippet);
}
delete(phone: Phone): void {
  this.phones = this.phones.filter(h => h !== phone);
  this.phoneService.deletePhone(phone).subscribe();
}
  ngOnInit() {
	  this.getPhones();
  }
  

}
