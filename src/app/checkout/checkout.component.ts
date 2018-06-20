import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { PhoneService } from "../services/phone.service";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "../services/cart.service";
import { Location } from "@angular/common";
import { MockDataService } from "../services/mock-data.service";
import { City } from "../city";
import { Observable } from "rxjs/Observable";
import { Phone } from "../phone";
import { Voucher } from "../voucher";
import { Order } from "../order";
import { Timestamp } from "rxjs";
import { OrderService } from "../services/order.service";
import { AuthService } from "../core/auth.service";
import { User } from "../user";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {
  public totalCost: number;
  public currentCost: number;
  public order: Order;
  public enabled: number;
  shoppingCartItems: Phone[];
  shoppingCartItems$: Observable<Phone[]>;
  vouchers$: Observable<Voucher[]>;
  vouchers: Voucher[] = [];
  orders$: Observable<Order[]>;
  orders: Order[] = [];
  voucher: Voucher;
  cities: City[] = [];
  districts: Observable<City[]>;
  voucherCheck: boolean;
  discount: number;
  latestOrder: string;
  orderID: string;

  @ViewChild("customerEmail") customerEmail: any;
  @ViewChild("customerName") customerName: any;
  @ViewChild("customerPhone") customerPhone: any;
  @ViewChild("customerAddress") customerAddress: any;
  @ViewChild("customerCity") customerCity: any;
  @ViewChild("customerDistrict") customerDistrict: any;
  @ViewChild("customerWard") customerWard: any;
  @ViewChild("voucherError") voucherErrot: any;
  @ViewChild("voucherCode") voucherCode: any;
  @ViewChild("save") saveButton: any;
  @ViewChild("update") updateButton: any;
  @Input() user: User;

  constructor(
    private phoneService: PhoneService,
    private route: ActivatedRoute,
    public location: Location,
    private cartService: CartService,
    private mockDataService: MockDataService,
    private orderService: OrderService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    //this.getCities();
    this.getOrders();
    this.getItems();
    this.getTotalCost();
    this.loadcurrentCost();
    this.getvouchers();
    this.enabled = 1;
    if(this.auth.user){
      this.auth.user.subscribe(_ => (this.user = _));
      }
  }

  getOrders() {
    this.orders$ = this.orderService.getOrders();
    this.orders$.subscribe(_ => (this.orders = _));
  }
  getOrderID(): number {
    var max = parseInt(this.orders[0].id.replace("order-",""));
    for(var i=0;i<this.orders.length;i++){
      var temp = parseInt(this.orders[i].id.replace("order-",""));
      if(temp > max){
        max = temp;
      }
    }
    return (max + 1);
  }
  /** Thêm mới đơn hàng vào database */
  addOrder(
    customerEmail: string,
    customerName: string,
    customerPhone: string,
    customerTaxCode: string,
    customerAddress: string,
    customerCity: string,
    customerDistrict: string,
    customerWard: string
  ) {
    this.orderID = "order-" + this.getOrderID().toString();
    console.log(this.orderID);
    this.orderService.addOrder(
      this.orderID,
      customerEmail,
      customerName,
      parseInt(customerPhone),
      customerTaxCode,
      customerAddress,
      customerCity,
      customerDistrict,
      customerWard,
      this.totalCost,
      this.currentCost,
      new Date(),
      "Đơn hàng #" + this.orderID,
      "Đang xử lí"
    );
    if(this.user){
      this.orderService.addOrderUser(this.user.id, this.orderID);
    }
    this.addOrderProducts(this.orderID);
    /** Chuyển sang trang thông tin mua thành công */
    //window.location.href="/buy-successful";//?orderID="+this.orderID;
  }
  /** Thêm sản phẩm vào đơn hàng vừa tạo */
  addOrderProducts(orderID: string){
    var i = 0;
    do {
      this.orderService.addOrderProducts(orderID, this.shoppingCartItems[i]);
      i++;
    } while (i<this.shoppingCartItems.length);
  }
  /** Lấy ra tất cả sản phẩm trong giỏ hàng */
  getItems() {
    this.shoppingCartItems$ = this.cartService.getItems();
    this.shoppingCartItems$.subscribe(_ => (this.shoppingCartItems = _));
    //console.log(this.shoppingCartItems);
  }
  getvouchers() {
    this.vouchers$ = this.mockDataService.getVoucherCode();
    this.vouchers$.subscribe(_ => (this.vouchers = _));
  }
  getTotalCost() {
    this.totalCost = 0;
    this.shoppingCartItems.forEach(element => {
      this.totalCost = this.totalCost + element.qtyinCart * element.sale_price;
    });
  }
  loadcurrentCost() {
    this.currentCost = this.totalCost;
  }
  checkVoucherCode() {
    var code = this.voucherCode.nativeElement.value;
    var count = 0;
    //console.log(this.vouchers);
    //console.log(this.orders);
    this.discount = 0;
    for (var i = 0; i < this.vouchers.length; i++) {
      var element = this.vouchers[i];
      if (element.id == code) {
        count++;
        this.voucher = element;
      }
    }
    if (count == 0) {
      document.getElementById("voucherError").innerHTML =
        "Xin lỗi, mã giảm giá này không có hiệu lực. Vui lòng kiểm tra lại mã.";
      console.log("3");
    } else {
      if (this.voucher.data.expired == false) {
        this.discount = this.totalCost - this.voucher.data.discount;
        if (this.discount > 0) {
          this.currentCost = this.discount;
          document.getElementById("voucherError").innerHTML =
            "Bạn đã đuợc giảm " + this.voucher.data.discount.toString() + "đ";
        } else {
          document.getElementById("voucherError").innerHTML =
            "Mã giảm giá vượt quá giá trị đơn hàng.";
        }
      }
      if (this.voucher.data.expired == true) {
        document.getElementById("voucherError").innerHTML =
          "Xin lỗi, mã giảm giá đã hết hạn sử dụng.";
      }
    }
  }
  checkToRemove(phone: Phone) {
    if (this.shoppingCartItems.length == 1) {
      alert(
        "Lỗi! Cần có ít nhất 1 sản phẩm trong giỏ hàng để tiếp tục thanh toán!"
      );
      return false;
    } else {
      if (confirm("Bạn có thực sự muốn xóa sản phẩm này khỏi giỏ hàng?")) {
        this.removeFromCart(phone);
        return true;
      } else {
        return false;
      }
    }
  }

  removeFromCart(phone: Phone) {
    this.cartService.removeFromCart(phone);
  }

  validateForm(): boolean {
    var formElement = [
      this.customerEmail,
      this.customerName,
      this.customerPhone,
      this.customerAddress,
      this.customerCity,
      this.customerDistrict,
      this.customerWard
    ];
    var count = 0;
    for (var i = 0; i < formElement.length; i++) {
      var element = formElement[i];
      if (element.invalid && (element.dirty || element.touched)) {
        if (
          (element.errors && element.errors.pattern)
        ) {
          count++;
        }
      }
    }
    if (count !== 0) {
      alert("Lỗi! Vui lòng kiểm tra lại thông tin giao hàng!");
      return false;
    } else {
      this.saveButton.nativeElement.hidden = true;
      this.updateButton.nativeElement.hidden = false;
      this.setStateElement("save");
      alert("Đã lưu thông tin giao hàng!");
      return true;
    }
  }
  updateForm() {
    this.saveButton.nativeElement.hidden = false;
    this.updateButton.nativeElement.hidden = true;
    this.setStateElement("update");
  }
  setStateElement(action: string) {
    var formElement = [
      document.getElementById("customerEmail"),
      document.getElementById("customerName"),
      document.getElementById("customerPhone"),
      document.getElementById("customerTaxCode"),
      document.getElementById("customerAddress"),
      document.getElementById("customerCity"),
      document.getElementById("customerDistrict"),
      document.getElementById("customerWard")
    ];
    formElement.forEach(element => {
      if (action == "save") {
        element.setAttribute("style", "background-color: #adadad;");
        this.enabled = 0;
      }
      if (action == "update") {
        element.setAttribute("style", "background-color: #fff;");
        this.enabled = 1;
      }
    });
  }
  getCities() {
    this.mockDataService
      .getCities()
      .subscribe(cities => (this.cities = cities));
    //console.log(this.cities);
  }
  getDistricts(city: string) {
    console.log(city);
    this.districts = this.mockDataService.getDistricts(city);
    console.log(this.districts);
  }
}
