import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    BannerComponent,
    FeaturesComponent,
    FooterComponent,
    HomeComponent,
  ],
  providers: [CookieService],

  bootstrap: [AppComponent]
})
export class AppModule { }
