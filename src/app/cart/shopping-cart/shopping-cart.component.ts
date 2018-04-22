import { Component, OnInit, ViewChild } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Phone } from "../../phone";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"]
})
export class ShoppingCartComponent implements OnInit {
  public shoppingCartItems$: Observable<Phone[]> = of([]);
  public shoppingCartItems: Phone[] = [];
  public totalCost: number;
  @ViewChild("totalPerProduct") totalProduct: any;

  constructor(private cartService: CartService) {
    this.getItems();
    this.getTotalCost();
  }

  ngOnInit() {}

  getItems() {
    this.shoppingCartItems$ = this.cartService.getItems();
    this.shoppingCartItems$.subscribe(_ => (this.shoppingCartItems = _));
  }

  removeFromCart(phone: Phone) {
    
    this.cartService.removeFromCart(phone);
  }
  checkToRemove(phone: Phone){
    if(confirm("Bạn có thực sự muốn xóa sản phẩm này khỏi giỏ hàng?")){
      this.removeFromCart(phone);
      return true;
    }else{
      return false;
    }
  }

  increaseQty(product: Phone, index: number) {
    if (product.qtyinCart >= product.inStock) {
      return false;
    } else {
      product.qtyinCart++;
      this.getTotalCost();
      document
        .getElementById("qty" + index.toString())
        .setAttribute("value", product.qtyinCart.toString());
    }
  }
  reduceQty(product: Phone, index: number) {
    if (product.qtyinCart > 1) {
      product.qtyinCart--;
      this.getTotalCost();
      document
        .getElementById("qty" + index.toString())
        .setAttribute("value", product.qtyinCart.toString());
    } else {
      return false;
    }
  }

  totalDefault(product: Phone) {}
  
  getTotalCost(){
    this.totalCost = 0;
    this.shoppingCartItems.forEach(element => {
      this.totalCost = this.totalCost+(element.qtyinCart*element.sale_price);
    });
  }
}
