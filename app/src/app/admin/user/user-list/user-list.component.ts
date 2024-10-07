import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from 'src/app/layout/admin/footer/footer.component';
import { LogoutComponent } from 'src/app/layout/admin/logout/logout.component';
import { SidebarComponent } from 'src/app/layout/admin/sidebar/sidebar.component';
import { TopbarComponent } from 'src/app/layout/admin/topbar/topbar.component';
import { User } from 'src/app/model/user/user';

import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-list',
  standalone:true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    TopbarComponent,
    LogoutComponent,
    FooterComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css',
    './../../../../assets/vendor/fontawesome-free/css/all.min.css',
    './../../../../assets/css/sb-admin-2.min.css',
  ],
})
export class UserListComponent implements OnInit {
  list: User[] = [];
  searchQuery: string = '';
  index: number = 1;
  size: number = 5;
  totalPages: number = 1;
  pageSizes: number[] = [5, 10, 15, 20];
  constructor(
    private service: UserService,
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
    this.service.getUsers( this.searchQuery, this.index, this.size).subscribe(
      (res: { users: User[]; total: number }) => {
        this.list = res.users;   // Ensure res.users exists
        this.totalPages = Math.ceil(res.total / this.size); // Ensure res.total exists
        console.log('Users:', this.list);
        console.log('Total:', res.total);
      },
      (error) => {
        console.error('Error fetching Users', error);
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


}
