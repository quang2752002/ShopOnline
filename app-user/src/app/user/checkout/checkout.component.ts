import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BannerAreaComponent } from 'src/app/layout/banner-area/banner-area.component';
import { FeaturesComponent } from 'src/app/layout/features/features.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { CartService } from 'src/app/service/cart/cart.service';
import { OrderService } from 'src/app/service/order/order.service';

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
    MatSnackBarModule, 
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  selectedIds: string[] = []; // Store selected cart item IDs
  cartItems: any[] = []; // Array to store cart items
  subtotal: number = 0; // Store the subtotal
  total: number = 0; // Store the total amount
  shippingCost: number = 50; // Flat shipping rate

  // Billing details
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  address: string = '';
  orderNotes: string = '';

  constructor(
    private cartService: CartService,
    private cookieService: CookieService,
    private router: Router,
    private orderService: OrderService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit() {
    if (!this.cookieService.get('token')) {
      this.router.navigate(['/login']);
      return;
    }
    this.selectedIds = this.cartService.getCartIds();
    console.log('List of selected IDs:', this.selectedIds);
    this.getCart(); // Fetch the cart data
  }

  getCart() {
    this.cartService.getCartCheckOut(this.selectedIds).subscribe({
      next: (response) => {
        this.cartItems = response; // Store cart items
        this.calculateTotal(); // Calculate total after fetching items
        console.log("cart", this.cartItems);
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
      }
    });
  }

  calculateTotal() {
    this.subtotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.total = this.subtotal + this.shippingCost; // Add shipping cost
  }

  checkOut() {
    if (!this.firstName || !this.lastName || !this.phone || !this.address) {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
      });
      return;
    }
  
    const name = this.firstName + ' ' + this.lastName;
    this.orderService.checkOut(this.selectedIds, name, this.phone, this.address, this.orderNotes)
      .subscribe({
        next: (response) => {
          console.log('Order response:', response); // Log the full response
          
          if (response && typeof response === 'string') {
            // Backend returned a redirect URL in plain text
            window.location.href = response;
          } else if (response) {
            // Handle JSON response (if applicable)
            console.log('Order successful, redirect URL:', response.redirectUrl);
          } else {
            this.snackBar.open('Order successful, but no redirect URL provided.', 'Close', {
              duration: 3000,
            });
          }
        },
        error: (err) => {
          console.error('Error during checkout:', err);
          this.snackBar.open('Checkout failed. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      });
  }
}
