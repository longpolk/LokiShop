import {CartService} from '../../services/cart.service';
import {Component, Input} from '@angular/core';
import {Phone} from '../../phone';
@Component(
  {
    selector: 'shopping-cart-item',
    templateUrl: './shopping-cart-item.html'
  }
)

export class ShoppingCartItem {
    @Input()product : Phone;
    constructor(private _cartService : CartService) {}
    AddProduct(_product : Phone) {
        _product.added = true;
        this
            ._cartService
            .addProduct(_product);
    }
    RemoveProduct(_product : Phone) {
        _product.added = false;
        this
            ._cartService
            .removeProduct(_product.id);
    }

}