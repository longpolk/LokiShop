import { Component, OnInit, Input, AfterContentInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Phone } from '../../phone';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Input() systemPhone: Phone[];
  @Input() newCustomerEmail: string;
  @Input() newShippingAddress: string;
  constructor(
    private route: ActivatedRoute,
    private phoneService: PhoneService,
    private location: Location,
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOrder();
    this.getProductsOrder();
    this.getProductsSystem();
  }
  getOrder(): void {
    this.route.params.subscribe(params => {
	  const id = params['id'];
      this.orderService
        .getOrder(id)
        .subscribe(_ => this.order = _)
    });
  }
  getProductsOrder(): void {
    this.route.params.subscribe(params => {
	  const id = params['id'];
      this.orderService
        .getProductsOrder(id)
        .subscribe(_ => this.phones = _)
    });
  }
  getProductsSystem(): void {
      this.phoneService
        .getPhones()
        .subscribe(_ => this.systemPhone = _)
    }
  getProductsInfoFromSystem(): void {
    this.phones.forEach(phone => {
      for(var i = 0; i< this.systemPhone.length; i++){
        if(this.systemPhone[i].id == phone.id){
          console.log(this.systemPhone[i]);
          phone.category = this.systemPhone[i]["data"].category;
          phone.inStock = this.systemPhone[i]["data"].inStock;
        }
      }
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
    this.orderService.deleteOrder(order);
    alert("Đã xóa đơn hàng!");
  }
  confirmMarkAsPaid(order: Order) {
    if (confirm("Xác nhận khách hàng đã thanh toán số tiền "+(order.currentCost)+"₫ bằng phương thức thanh toán thủ công cho đơn hàng này?")) {
      this.markAsPaid(this.order);
      return true;
    } else {
      return false;
    }
  }
  markAsPaid(order: Order) {
    this.orderService.updateStatus(order, "Đã thanh toán");
    alert("Đơn hàng đã được thanh toán thành công, tổng tiền: "+Number(order.currentCost)+"₫ !");
  }
  callShippingDialog(){
    this.getProductsInfoFromSystem();
    var shippingDialog = document.getElementById("shipping_modal_container");
    shippingDialog.style.display = "block";
    console.log(this.phones);
  }
  dismissShippingDialog(){
    var shippingDialog = document.getElementById("shipping_modal_container");
    shippingDialog.style.display = "none";
  }
  confirmMarkAsDelivered(order: Order) {
    if (confirm("Xác nhận đã giao hàng cho đơn hàng: #"+(order.id)+" ?")) {
      this.markAsDeliveried(this.order);
      this.dismissShippingDialog();
      this.router.navigate[("/admin/orders")];
      return true;
    } else {
      return false;
    }
  }
  markAsDeliveried(order: Order) {
    this.orderService.updateStatus(order, "Đã giao hàng");
    alert("Đơn hàng đã được chuyển sang trạng thái đã giao!");
  }
  editShippingAddress(){
    var shippingAddress = document.getElementById("newShippingAddress");
    shippingAddress.style.display = "initial";
    var submitUpdateOrder = document.getElementById("submitUpdateOrder")
    submitUpdateOrder.removeAttribute("disabled")
    submitUpdateOrder.setAttribute("enabled","");
  }
  editOrderEmail(){
    var customerEmail = document.getElementById("newCustomerEmail");
    customerEmail.style.display = "initial";
    var submitUpdateOrder = document.getElementById("submitUpdateOrder")
    submitUpdateOrder.removeAttribute("disabled")
    submitUpdateOrder.setAttribute("enabled","");
  }
  updateCustomerInformation(order: Order, email: string, address: string){
    this.orderService.updateCustomerInformation(order, email, address);
    var shippingAddress = document.getElementById("newShippingAddress");
    shippingAddress.style.display = "none";
    var customerEmail = document.getElementById("newCustomerEmail");
    customerEmail.style.display = "none";
    document.getElementById("submitUpdateOrder").setAttribute("disabled","");
    alert("Cập nhật thông tin đơn hàng thành công!");
  }
}
