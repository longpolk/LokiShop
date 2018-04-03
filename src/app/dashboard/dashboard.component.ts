import { Component, OnInit } from '@angular/core';
import { Phone } from '../phone';
import { PhoneService } from '../phone.service';
import { RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './assets/web/assets/mobirise-icons/mobirise-icons.css',
  './assets/tether/tether.min.css',
  './assets/bootstrap/css/bootstrap.min.css',
  './assets/bootstrap/css/bootstrap-grid.min.css',
  './assets/bootstrap/css/bootstrap-reboot.min.css',
  './assets/animatecss/animate.min.css',
  './assets/socicon/css/styles.css',
  './assets/dropdown/css/style.css',
  './assets/theme/css/style.css',
  './assets/gallery/style.css',
  './assets/mobirise/css/mbr-additional.css']
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