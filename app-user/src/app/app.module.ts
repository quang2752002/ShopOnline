import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { BannerComponent } from './layout/banner/banner.component';
import { FeaturesComponent } from './layout/features/features.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProductListComponent } from './user/product-list/product-list.component';
import { CartComponent } from './user/cart/cart.component';
import { HomeComponent } from './user/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { BannerAreaComponent } from './layout/banner-area/banner-area.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { CheckoutComponent } from './user/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,
    HeaderComponent,
    BannerComponent,
    FeaturesComponent,
    FooterComponent,
    HomeComponent,
    BannerAreaComponent,
    ProductListComponent,
    BrowserAnimationsModule,
    CartComponent,
    CheckoutComponent,

  ],
  providers: [CookieService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule { }
