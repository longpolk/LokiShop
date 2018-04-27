import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule } from "@agm/core";

import { AppComponent } from "./app.component";
import { LokiShopComponent } from "./loki-shop/loki-shop.component";
import { PhoneDetailComponent } from "./phone-detail/phone-detail.component";
import { PhoneService } from "./services/phone.service";
import { MessagesComponent } from "./messages/messages.component";
import { MessageService } from "./services/messages.service";
import { AppRoutingModule } from ".//app-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./services/in-memory-data.service";
import { PhoneSearchComponent } from "./phone-search/phone-search.component";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from "../environments/environment";
import { AdministratorComponent } from "./administrator/administrator.component";
import { UserService } from "./services/user.service";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ShoppingCartItem } from "./cart/shopping-cart-item/shopping-cart-item";
import { shoppingCart } from "./cart/shopping-cart/shopping-cart";
import { ShoppingList } from "./cart/shopping-list/shopping-list";
import { CartService } from "./services/cart.service";
import { ShoppingCartComponent } from "./cart/shopping-cart/shopping-cart.component";
import { Location, CommonModule } from "@angular/common";
import { LocalStorageModule } from "angular-2-local-storage";
import { SignupComponent } from "./signup/signup.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { MockDataService } from "./services/mock-data.service";
import { OrderService } from "./services/order.service";
import { BuySuccessfulComponent } from "./buy-successful/buy-successful.component";

@NgModule({
  declarations: [
    AppComponent,
    LokiShopComponent,
    PhoneDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PhoneSearchComponent,
    AdministratorComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ShoppingCartItem,
    shoppingCart,
    ShoppingList,
    ShoppingCartComponent,
    SignupComponent,
    CheckoutComponent,
    BuySuccessfulComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    LocalStorageModule.withConfig({
      prefix: "LokiShop",
      storageType: "localStorage"
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBwV1LXU0LqGEKftj9U6sF91A8qwCNlONM',
      libraries: ["places"]
    })
  ],
  providers: [
    PhoneService,
    MessageService,
    UserService,
    CartService,
    Location,
    MockDataService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
