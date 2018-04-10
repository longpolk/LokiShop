import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LokiShopComponent } from './loki-shop/loki-shop.component';
import { PhoneDetailComponent } from './phone-detail/phone-detail.component';
import { PhoneService } from './phone.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './messages.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { PhoneSearchComponent } from './phone-search/phone-search.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AdministratorComponent } from './administrator/administrator.component';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
	AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    FormsModule,
    AppRoutingModule,
	HttpClientModule,
	BrowserAnimationsModule 
  ],
  providers: [
	PhoneService,
	MessageService,
	UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
