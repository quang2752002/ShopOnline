import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/service/cart/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Cart } from 'src/app/model/cart/cart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { BannerAreaComponent } from 'src/app/layout/banner-area/banner-area.component';
import { FeaturesComponent } from 'src/app/layout/features/features.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';

@Component({
  selector: 'app-cart',
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
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  list: Cart[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;
  selectedIds: string[] = []; // Track selected items

  constructor(
    private service: CartService,
    private cookieService: CookieService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    if (!this.cookieService.get('token')) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadList();
  }

  loadList(): void {
    this.loading = true;

    this.service.refreshList()
      .subscribe(
        res => {
          this.list = res;
          console.log(this.list);
        },
        error => {
          this.loading = false;
          this.errorMessage = error;
        }
      );
  }

  increaseQuantity(item: Cart): void {
    if (item.quantity < item.productQuantity) {
      item.quantity += 1;
  
      // Call the service to update the quantity
      this.service.updateCart(item.productId, item.quantity).subscribe({
        next: (response) => {
          // Handle success (if needed)
          this.snackBar.open('Quantity updated successfully.', 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        error: (error) => {
          // Handle error and revert the change in case of failure
          item.quantity -= 1; // Revert the quantity back
          this.snackBar.open('Failed to update quantity. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    }
  }
  
  decreaseQuantity(item: Cart): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
  
      // Call the service to update the quantity
      this.service.updateCart(item.productId, item.quantity).subscribe({
        next: (response) => {
          // Handle success (if needed)
          this.snackBar.open('Quantity updated successfully.', 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        error: (error) => {
          // Handle error and revert the change in case of failure
          item.quantity += 1; // Revert the quantity back
          this.snackBar.open('Failed to update quantity. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    }
  }
  

  updateSelectedItems(itemId: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedIds.push(itemId); // Add ID if checkbox is selected
    } else {
      this.selectedIds = this.selectedIds.filter(id => id !== itemId); // Remove if unchecked
    }
    console.log('Selected Items:', this.selectedIds);
  }
  

  proceedToCheckout(): void {
    if (this.selectedIds.length === 0) {
      // Show a message to the user to select at least one item
      this.snackBar.open('Please select at least one product to proceed to checkout.', 'Close', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return; // Stop execution if no items are selected
    }
  
    // Proceed if items are selected
    this.service.setCartIds(this.selectedIds); // Save selected IDs in the service
    this.router.navigate(['/checkout']); // Navigate to the checkout page
  }
  

  calculateSubtotal(): number {
    return this.list
      .filter(item => this.selectedIds.includes(item.id)) // Only include selected items
      .reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
  }
  
}
