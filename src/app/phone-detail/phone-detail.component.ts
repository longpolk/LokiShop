import { Component, OnInit, Input } from '@angular/core';
import { Phone } from '../phone';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PhoneService }  from '../phone.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.css']
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
  getPhone(): void{
	  const id = +this.route.snapshot.paramMap.get('id'); //add '+' before 'this.' to return number
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
 /** PUT: update the hero on the server */
updatePhone (phone: Phone): Observable<any> {
  return this.http.put(this.phonesUrl, phone, httpOptions).pipe(
    tap(_ => this.log(`updated phone id=${phone.id}`)),
    catchError(this.phoneService.handleError<any>('updatePhone'))
  );
}
}
