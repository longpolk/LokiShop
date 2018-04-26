import { Component, OnInit, ViewChild } from "@angular/core";
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
  vouchers: Voucher[];
  voucher: Voucher;
  cities: City[] = [];
  districts: Observable<City[]>;
  voucherCheck: boolean;
  discount: number;

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

  constructor(
    private phoneService: PhoneService,
    private route: ActivatedRoute,
    public location: Location,
    private cartService: CartService,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    //this.getCities();
    this.getItems();
    this.getTotalCost();
    this.loadcurrentCost();
    this.getvouchers();
    this.enabled = 1;
  }

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
    console.log(this.vouchers);
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
          element.errors.required ||
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
  createOrder(){
    var email = document.getElementById("customerEmail").getAttribute("value");
    var name = document.getElementById("customerName").getAttribute("value");
    var phone = document.getElementById("customerPhone").getAttribute("value");
    var tax = document.getElementById("customerTaxCode").getAttribute("value");
    var address = document.getElementById("customerAddress").getAttribute("value");
    var city = document.getElementById("customerCity").getAttribute("value");
    var district = document.getElementById("customerDistrict").getAttribute("value");
    var ward = document.getElementById("customerWard").getAttribute("value");
    this.order.customerEmail = email;
    this.order.customerName = name;
    this.order.customerPhone = parseInt(phone);
    this.order.customerTaxCode = tax;
    this.order.customerAddress = address;
    this.order.customerCity = city;
    this.order.customerDistrict = district;
    this.order.customerWard = ward;
    this.order.totalCost = this.totalCost;
    this.order.currentCost = this.currentCost;
    this.order.createdDate = new Date();
    this.order.products = this.shoppingCartItems;
    

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
