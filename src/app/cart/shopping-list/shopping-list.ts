import { Phone } from '../../phone';
import {CartService} from '../../services/cart.service';
import {Component} from '@angular/core';
import { OnInit, OnDestroy, Input} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CartState} from '../../CartState';

@Component({selector: 'shopping-list', templateUrl: './shopping-list.html'})

export class ShoppingList {
    loaded : boolean = true
    products : Phone[];
    private subscription : Subscription;
    constructor(private _cartService : CartService) {}
    ngOnInit() {
        // this.loaderService.show();
        this.subscription = this
            ._cartService
            .CartState
            .subscribe((state : CartState) => {
                this.products = state.products;
                console.log(this.products);
            });

    }
    ngOnDestroy() {
        this
            .subscription
            .unsubscribe();
    }
}