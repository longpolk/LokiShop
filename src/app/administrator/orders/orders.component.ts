import { Component, OnInit } from '@angular/core';
import { Order } from "../../order";
import { PhoneService } from "../../services/phone.service";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../../category";
import { Location } from "@angular/common";
import { Brand } from "../../brand";
import { Observable } from "rxjs/observable";
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css',
  "../base.scss.css",
  "../responsive.scss.css",
  "../bootstrap.css",
  "../themify-icons.css",
  "../bootstrap.min.css",
  "../font-awesome.min.css",
  "../style.scss.css",
  "../module.scss.css",
  "../bpr-products-module.css",
  "../main.min.css"
]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    public location: Location
  ) { }

  ngOnInit() {
    this.orders = this.getOrders();
  }
  getOrders(): Order[] {
    let orders = [];
    this.orderService.getOrders().subscribe(data => {
      data.forEach(element => {
        orders.push(element);
      });
    });
    console.log(orders);
    return orders;
  }
}
