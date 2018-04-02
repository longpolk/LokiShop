import { Component, OnInit } from '@angular/core';
import { Phone } from '../phone';
import { PhoneService } from '../phone.service';
import { RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  phones: Phone[] = [];
 
  constructor(private phoneService: PhoneService) { }
 
  ngOnInit() {
    this.getPhones();
  }
 
  getPhones(): void {
    this.phoneService.getPhones()
      .subscribe(phones => this.phones = phones.slice(1, 5));
  }
}