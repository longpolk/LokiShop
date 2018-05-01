import {
  Component,
  OnInit,
  Input,
  AfterContentInit,
  ViewEncapsulation,
  ViewChild,
  NgZone,
  ElementRef
} from "@angular/core";
import { Order } from "../order";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { OrderService } from "../services/order.service";
import { Phone } from "../phone";
import { FormControl } from "@angular/forms";
//import {} from "googlemaps";
import { MapsAPILoader } from "@agm/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-buy-successful",
  templateUrl: "./buy-successful.component.html",
  styleUrls: ["./buy-successful.component.css"]
})
export class BuySuccessfulComponent implements OnInit {
  @Input() order: Order;
  @Input() phones: Phone[] = [];
  observableLocation: Observable<any>;
  places: any[] = [];
  public latitude: number;
  public longitude: number;
  public zoom: number;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private location: Location,
    private http: Http
  ) {}

  ngOnInit() {
    this.getOrder();
    //this.setCurrentPosition();
    //this.getCustomerLocation_Array();
  }

  getOrder(): void {
    this.route.params.subscribe(params => {
      const id = params["orderID"];
      //console.log(id);
      this.orderService.getOrder(id).subscribe(_ => (this.order = _));
      this.orderService.getProductsOrder(id).subscribe(_ => (this.phones = _));
    });
  }
  /*
  getCustomerLocation_Array(){
    this.observableLocation = this.orderService.setCurrentPosition(
      this.order.customerAddress,
      this.order.customerCity,
      this.order.customerDistrict,
      this.order.customerWard
    );
    this.observableLocation.subscribe(places => this.places = places);
  }
  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }*/

}
