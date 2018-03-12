import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LokiShopComponent } from './loki-shop/loki-shop.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhoneDetailComponent }  from './phone-detail/phone-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: PhoneDetailComponent },
  { path: 'phones', component: LokiShopComponent }
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
