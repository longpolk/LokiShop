import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Phone } from '../phone';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PhoneService }  from '../phone.service';
import * as Jarallax from './assets/parallax/jarallax.min.js';

declare var Jarallax: any;
@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
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
export class PhoneDetailComponent implements OnInit {
	
  @Input() phone: Phone;
  constructor(
	private route: ActivatedRoute,
	private phoneService: PhoneService,
	private location: Location
	
  ) { }

  ngOnInit(): void {
	  this.getPhone();
  }
  ngAfterContentInit()
    {   
        const scene = document.getElementById('form3-16');
        const parallaxInstance = new Jarallax(scene,{
          relativeInput: true,
          hoverOnly: true
        });
    }
  getPhone(): void{
	  const id = this.route.snapshot.paramMap.get('id'); //add '+' before 'this.' to return number
      this.phoneService.getPhone(id)
    .subscribe(phone => this.phone = phone);
  }
  goBack(): void {
  this.location.back();
}
save(): void {
   this.phoneService.updatePhone(this.phone)
     .subscribe(() => this.goBack());
 }
}
