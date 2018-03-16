import { Component, OnInit } from '@angular/core';
import { Phone } from '../phone';
import { PhoneService } from '../phone.service';
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
  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.phoneService.addPhone({ name } as Phone)
    .subscribe(phone => {
      this.phones.push(phone);
    });
}
delete(phone: Phone): void {
  this.phones = this.phones.filter(h => h !== phone);
  this.phoneService.deletePhone(phone).subscribe();
}
  ngOnInit() {
	  this.getPhones();
  }
  

}
