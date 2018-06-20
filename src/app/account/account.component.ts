import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { OrderService } from '../services/order.service';
import { Order } from '../order';
import { Observable } from '@firebase/util';
import { User } from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css',
  "/base.scss.css",
    "./responsive.scss.css",
    "./bootstrap.css",
    "./themify-icons.css",
    "./bootstrap.min.css",
    "./font-awesome.min.css",
    "./style.scss.css",
    "./module.scss.css",
    "./bpr-products-module.css"
]
})
export class AccountComponent implements OnInit {
  @Input() order: Order;
  @Input() user: User;
  orders: Order[] = [];
  order$: Observable<Order>;
  constructor(
    public auth: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    if(this.auth.user){
    this.auth.user.subscribe(_ => (this.user = _));
    }
  }
  getOrders(ids: string[]){
    this.orders = [];
    for(var i=0;i<ids.length;i++){
    this.orderService.getOrdersOfUser(ids[i]).subscribe(data => {
      data.forEach(element => {
        this.orders.push(element);
      });
    });
  }
}
}
