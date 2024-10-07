import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from 'src/app/layout/admin/footer/footer.component';
import { LogoutComponent } from 'src/app/layout/admin/logout/logout.component';
import { SidebarComponent } from 'src/app/layout/admin/sidebar/sidebar.component';
import { TopbarComponent } from 'src/app/layout/admin/topbar/topbar.component';
import { Category } from 'src/app/model/category/category';
import { Product } from 'src/app/model/product/product';
import { CategoryService } from 'src/app/service/category/category.service';
import { ProductService } from 'src/app/service/product/product.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    TopbarComponent,
    LogoutComponent,
    FooterComponent,
  ],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css',
    './../../../../assets/vendor/fontawesome-free/css/all.min.css',
    './../../../../assets/css/sb-admin-2.min.css',
  ],
})
export class ProductCreateComponent implements OnInit {
  name: string = '';
  description: string = '';
  price: number = 0;
  quantity: number = 0;
  categoryId: string = '';
  isLoading: boolean = false;
  categoryList: Category[] = [];
  selectedCategoryId: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private service: ProductService,
    private cookieService: CookieService,
    private router: Router,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.cookieService.get('token')) {
      this.router.navigate(['/login']);
      return;
    }

    this.getListCategory();
  }

  onCreate() {
    if (!this.name || !this.price || !this.quantity || !this.selectedCategoryId) {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    this.isLoading = true;

    this.service.create( this.name, this.description, this.price, this.quantity, this.selectedCategoryId).subscribe({
      next: (response) => {
        this.snackBar.open('Product created successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.name = '';
        this.description = '';
        this.price = 0;
        this.quantity = 0;
        this.selectedCategoryId = "";
        this.isLoading = false;
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'Failed to create product. Please try again.';
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.isLoading = false;
      },
    });
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategoryId = target.value ? target.value : null;
  }

  getListCategory() {
    this.categoryService.getList().subscribe(
      (categories) => {
        this.categoryList = categories;
      },
      (error) => {
        console.error('Error fetching categories', error);
        this.errorMessage = error?.error?.message || 'Failed to load categories.';
      }
    );
  }
}
