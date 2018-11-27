import { Component, OnInit, Input, AfterContentInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Phone } from '../../phone';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PhoneService } from '../../services/phone.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartService } from '../../services/cart.service';
import { Brand } from '../../brand';
import { Category } from '../../category';
import { UploadService } from '../../services/upload.service';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../../services/order.service';
import { Order } from '../../order';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css',
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
export class OrderDetailComponent implements OnInit {
  @Input() order: Order;
  @Input() phones: Phone[];
  constructor(
    private route: ActivatedRoute,
    private phoneService: PhoneService,
    private location: Location,
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getOrder();
  }
  getOrder(): void {
    this.route.params.subscribe(params => {
	  const id = params['id'];
      this.orderService
        .getOrder(id)
        .subscribe(_ => this.order = _)
    });
  }
  goBack(): void {
    this.location.back();
  }
  confirmDelete(order: Order) {
    if (confirm("Bạn có thực sự muốn xóa đơn hàng này khỏi hệ thống?")) {
      console.log(this.order);
      this.deleteOrder(this.order);
      return true;
    } else {
      return false;
    }
  }
  deleteOrder(order: Order) {
    console.log(order);
    //this.orderService.deleteOrder(order);
    alert("Đã xóa đơn hàng!");
  }
}
