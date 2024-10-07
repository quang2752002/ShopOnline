import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from 'src/app/layout/admin/footer/footer.component';
import { LogoutComponent } from 'src/app/layout/admin/logout/logout.component';
import { SidebarComponent } from 'src/app/layout/admin/sidebar/sidebar.component';
import { TopbarComponent } from 'src/app/layout/admin/topbar/topbar.component';
import { Category } from 'src/app/model/category/category';
import { CategoryService } from 'src/app/service/category/category.service';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/model/product/product';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    TopbarComponent,
    LogoutComponent,
    FooterComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css',
    './../../../../assets/vendor/fontawesome-free/css/all.min.css',
    './../../../../assets/css/sb-admin-2.min.css',
  ],
})
export class ProductListComponent implements OnInit {
  list: Product[] = [];
  searchQuery: string = '';
  index: number = 1;
  size: number = 5;
  totalPages: number = 1;
  pageSizes: number[] = [5, 10, 15, 20];
  categoryList: Category[] = [];
  selectedCategoryId: string | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private service: ProductService,
    private cookieService: CookieService,
    private router: Router,
    private categorySrv: CategoryService,
  ) {}

  ngOnInit(): void {
    if (!this.cookieService.get('token')) {
      this.router.navigate(['/login']);
      return;
    }

    this.getListCategory();
    this.loadList();
  }

  loadList(): void {
    this.loading = true;
    

    this.service.refreshList( this.searchQuery.trim() || '', this.selectedCategoryId, this.index, this.size)
      .subscribe(
        res => {
          this.list = res.products;
          this.totalPages = Math.ceil(res.total / this.size);
          this.loading = false;
          this.errorMessage = null;
        },
        error => {
          this.loading = false;
          this.errorMessage = error;
          console.error('Error loading products', error);
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
    this.size = Number(target.value);
    this.index = 1;
    this.loadList();
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

  getPages(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;

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

  onDelete(id: string) {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');

    if (confirmDelete) {

      this.service.delete( id).subscribe(
        () => {
          this.loadList();
          console.log('Product deleted successfully');
        },
        error => {
          console.error('Error deleting product', error);
          this.errorMessage = error;
        }
      );
    }
  }

  getListCategory() {
    this.categorySrv.getList().subscribe(
      categories => {
        this.categoryList = categories;
      },
      error => {
        console.error('Error fetching categories', error);
        this.errorMessage = error;
      }
    );
  }
}
