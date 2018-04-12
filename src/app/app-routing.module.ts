import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LokiShopComponent } from './loki-shop/loki-shop.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhoneDetailComponent }  from './phone-detail/phone-detail.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './cart/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: PhoneDetailComponent },
  { path: 'phones', component: LokiShopComponent },
  { path: 'admin', component: AdministratorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: ShoppingCartComponent }
  
  //{ path: 'adminDashboard', component: AdministratorComponent}
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
