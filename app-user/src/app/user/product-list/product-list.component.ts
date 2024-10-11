import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BannerAreaComponent } from 'src/app/layout/banner-area/banner-area.component';
import { FeaturesComponent } from 'src/app/layout/features/features.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { Category } from 'src/app/model/category/category';
import { Product } from 'src/app/model/product/product';
import { CategoryService } from 'src/app/service/category/category.service';
import { ProductService } from 'src/app/service/product/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/service/cart/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule, 
    HeaderComponent,
    BannerAreaComponent,
    FeaturesComponent,
    FooterComponent,
    MatSnackBarModule , 

  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  list: Product[] = [];
  searchQuery: string = '';
  index: number = 1;
  size: number = 6;  // Default page size
  totalPages: number = 1;
  pageSizes: number[] = [6, 9, 12, 15];  // Options for page size
  sorting: string = ''; 
  categoryList: Category[] = [];
  selectedCategoryId: string | null = ''; 
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private service: ProductService,
    private cookieService: CookieService,
    private router: Router,
    private categoryService: CategoryService,
    private cartService :CartService, 
    private snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    this.getListCategory();
    this.loadList(); 
  }

  getListCategory(): void {
    this.categoryService.getList().subscribe(
      response => {
        this.categoryList = response;  
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  loadList(): void {
    this.loading = true;
  
    this.service.refreshList(this.searchQuery.trim() || '', this.selectedCategoryId, this.sorting, this.index, this.size)
      .subscribe(
        res => {
          this.list = res.products;
          this.totalPages = Math.ceil(res.total / this.size);  // Calculate total pages
          this.loading = false;
          this.errorMessage = null;
        },
        error => {
          this.loading = false;
          this.errorMessage = error;
        }
      );
  }
  

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.index = 1;
    this.loadList();
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.size = Number(target.value);  // Update the page size
    this.index = 1;  // Reset to the first page
    this.loadList();  // Reload the product list based on the new page size
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.index = newPage;
      this.loadList();
    }
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategoryId = target.value ? target.value : null; 
    this.index = 1;  
    this.loadList();  
  }
  
  onSortingChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sorting = target.value;
    this.index = 1;
    this.loadList();
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 3;

    if (this.totalPages <= maxPagesToShow) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    const startPage = Math.max(1, this.index - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      if (startPage > 2) {
        pages.unshift(-1);
      }
      pages.unshift(1);
    }

    if (endPage < this.totalPages) {
      pages.push(-1);
      pages.push(this.totalPages);
    }

    return pages;
  }
  addCart(productId: string, quantity: number): void {
    // Check if user is logged in (token exists)
    if (!this.cookieService.get('token')) {
      this.router.navigate(['/login']);
      return;
    }
  
    // Call service to add product to cart
    this.cartService.AddCart(productId, quantity).subscribe({
      next: () => { 
        this.snackBar.open('Item added to cart successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
  
        this.router.navigate(['/admin/product']);
      },
      error: (error) => {
        this.snackBar.open('Failed to add item to cart!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        console.error('Error adding item to cart', error);
      }
    });
  }
  
  
}
  
  

