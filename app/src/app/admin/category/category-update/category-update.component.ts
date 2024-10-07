import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from 'src/app/layout/admin/footer/footer.component';
import { LogoutComponent } from 'src/app/layout/admin/logout/logout.component';
import { SidebarComponent } from 'src/app/layout/admin/sidebar/sidebar.component';
import { TopbarComponent } from 'src/app/layout/admin/topbar/topbar.component';
import { Category } from 'src/app/model/category/category';
import { CategoryService } from 'src/app/service/category/category.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [
    FormsModule,
    SidebarComponent,
    TopbarComponent,
    LogoutComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css',
    './../../../../assets/vendor/fontawesome-free/css/all.min.css',
    './../../../../assets/css/sb-admin-2.min.css',
  ],
})
export class CategoryUpdateComponent implements OnInit {
  name: string = '';
  description: string = '';
  isActive: boolean = true;
  isLoading: boolean = false;
  id: string = ''; // Store the ID


  constructor(
    private service: CategoryService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    if (!this.cookieService.get('token')) {
      this.router.navigate(['/login']);
      return;
    }
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get the id from the route parameters and store it
      this.getCategory(this.id); // Call the method to fetch category data
    });
  }

  onUpdate(): void {
    this.isLoading = true;

    this.service.updateCategory( this.id, this.name, this.description, this.isActive).subscribe(
      response => {
        this.snackBar.open('Category updated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });


        this.router.navigate(['/admin/category']);
        this.isLoading = false;
      },
      error => {
        this.snackBar.open('Category Update Failed!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });

      }
    );
  }

  getCategory(id: string) {
    this.isLoading = true;

    this.service.getCategory( id).subscribe(
      (category: Category) => {
        this.name = category.name;
        this.description = category.description;
        this.isActive = category.isActive;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching category', error);
        this.isLoading = false;
      }
    );
  }
}
