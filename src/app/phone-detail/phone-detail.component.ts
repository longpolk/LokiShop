import { Component, OnInit, Input, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { Phone } from '../phone';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PhoneService }  from '../services/phone.service';
import {trigger, state, style, animate, transition} from '@angular/animations';


declare var Jarallax: any;
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: [ 
    './phone-detail.component.css'
]
})
export class PhoneDetailComponent implements OnInit {
	
  @Input() phone: Phone;
  @Input() mainImageUrl: string;
  constructor(
	private route: ActivatedRoute,
	private phoneService: PhoneService,
	private location: Location
	
  ) { }

  ngOnInit(): void {
	  this.getPhone();
  }
  setImage(imageUrl: string) {
    this.mainImageUrl = imageUrl;
    document.getElementById('zoom_01').setAttribute('src',this.mainImageUrl);
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
