import { CategoryService } from './../../../service/category/category.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from 'src/app/layout/admin/footer/footer.component';
import { LogoutComponent } from 'src/app/layout/admin/logout/logout.component';
import { SidebarComponent } from 'src/app/layout/admin/sidebar/sidebar.component';
import { TopbarComponent } from 'src/app/layout/admin/topbar/topbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [
    FormsModule,
    SidebarComponent,
    TopbarComponent,
    LogoutComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css',
    './../../../../assets/vendor/fontawesome-free/css/all.min.css',
    './../../../../assets/css/sb-admin-2.min.css',
  ],
})
export class CategoryCreateComponent implements OnInit {
  name: string = '';
  description: string = '';
  isLoading: boolean = false;

  constructor(
    private service: CategoryService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.cookieService.get('token')) {
      this.router.navigate(['/login']);
      return;
    }
  }

  onCreate(): void {
    this.isLoading = true;

    this.service.createCategory( this.name, this.description).subscribe({
      next: (response) => {
        this.snackBar.open('Category created successfully!', 'Close', {
           duration: 3000,
           verticalPosition: 'top',
           horizontalPosition: 'center',
          });
        this.name = '';
        this.description = '';
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Failed to create category. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
           horizontalPosition: 'center',
         });
        this.isLoading = false;
      },
    });
  }
}
