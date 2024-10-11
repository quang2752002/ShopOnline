import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BannerAreaComponent } from 'src/app/layout/banner-area/banner-area.component';
import { FeaturesComponent } from 'src/app/layout/features/features.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    HeaderComponent,
    BannerAreaComponent,
    FeaturesComponent,
    FooterComponent,
    MatSnackBarModule , 
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  selectedIds: string[] = []; // Store selected cart item IDs

  constructor(
    private cartService: CartService,
    private cookieService: CookieService,
    private router:Router,
  ) {}

  ngOnInit() {
    if (!this.cookieService.get('token')) {
      this.router.navigate(['/login']);
      return;
    }
    this.selectedIds = this.cartService.getCartIds();
    console.log('List of selected IDs:', this.selectedIds);
  }
}
