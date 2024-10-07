import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for redirection
import { FormsModule } from '@angular/forms';
import { FooterComponent } from 'src/app/layout/admin/footer/footer.component';
import { LogoutComponent } from 'src/app/layout/admin/logout/logout.component';
import { SidebarComponent } from 'src/app/layout/admin/sidebar/sidebar.component';
import { TopbarComponent } from 'src/app/layout/admin/topbar/topbar.component';
import { Category } from 'src/app/model/category/category';
import { CategoryService } from 'src/app/service/category/category.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    TopbarComponent,
    LogoutComponent,
    FooterComponent,
  ],
  templateUrl: './category-list.component.html',
  styleUrls: [
    './category-list.component.css',
    './../../../../assets/vendor/fontawesome-free/css/all.min.css',
    './../../../../assets/css/sb-admin-2.min.css',
  ],
})
export class CategoryListComponent implements OnInit {
  list: Category[] = [];
  searchQuery: string = '';
  index: number = 1;
  size: number = 5;
  totalPages: number = 1;
  pageSizes: number[] = [5, 10, 15, 20];

  constructor(
    private service: CategoryService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.cookieService.get('token')) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadList();
  }

  loadList(): void {
    this.service.refreshList(this.searchQuery, this.index, this.size).subscribe(
      (res: { categories: Category[]; total: number }) => {
        this.list = res.categories;
        this.totalPages = Math.ceil(res.total / this.size);
        console.log('Categories:', this.list);
        console.log('Total:', res.total);
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.index = 1;
    this.loadList();
  }

  onPageSizeChange(event: any): void {
    this.size = Number(event.target.value);
    this.index = 1;
    this.loadList();
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.index = newPage;
      this.loadList();
    }
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
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');

    if (confirmDelete) {
  
      this.service.delete( id).subscribe(
        response => {
          this.loadList();
          console.log('Category deleted successfully');
        },
        error => {
          console.error('Error deleting category', error);
        }
      );
    }
  }


}
