import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Phone} from '../../phone';
@Component({
    selector: 'shopping-cart',
    templateUrl: './shopping-cart.html'
})

export class shoppingCart implements OnInit {
    constructor(private cart_Service :CartService){
    }
    Products : Phone[]
    ngOnInit(){
        this.cart_Service.getAllProducts().subscribe(
            data => this.Products = data, //Bind to view
             err => {
                 // Log errors if any
                 console.log(err);
             });

    }
}