import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  templateUrl: './product-update.component.html',

  styleUrls: ['./product-update.component.css' ,
    './../../../../assets/vendor/fontawesome-free/css/all.min.css',
    './../../../../assets/css/sb-admin-2.min.css',
  ],
})
export class ProductUpdateComponent implements OnInit{

  name: string = '';
  description: string = '';
  price: number = 0;
  quantity: number = 0;
  categoryId: string = '';
  isLoading: boolean = false;
  categoryList: Category[] = [];
  selectedCategoryId: string | null = null;
  errorMessage: string | null = null;
  id: string = ''; // Store the ID


  constructor(
    private service: ProductService,
    private cookieService: CookieService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (!this.cookieService.get('token')) {
      this.router.navigate(['/login']);
      return;
    }
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get the id from the route parameters and store it
      this.getProduct(this.id); // Call the method to fetch category data
      this.getListCategory();
    });
  }

    onUpdate(){
      this.isLoading = true;

      this.service.update( this.id, this.name,this.description,this.price,this.quantity,this.selectedCategoryId??"").subscribe(
        response => {
          this.snackBar.open('Category updated successfully!', 'Close', {
             duration: 3000,
             verticalPosition: 'top',
             horizontalPosition: 'center',
             });

          this.router.navigate(['/admin/product']);
          this.isLoading = false;
        },
        error => {
          this.snackBar.open('Category Updated Failed!', 'Close', {
            duration: 3000 ,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          console.error('Error updating category', error);
          this.isLoading = false;
        }
      );
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
    getProduct(id: string) {
      this.isLoading = true;

      this.service.getProduct( id).subscribe(
        (product: Product) => {
          this.name = product.name;
          this.description = product.description;
          this.selectedCategoryId=product.categoryId
          this.price=product.price,
          this.quantity=product.quantity
          this.isLoading = false;
        },

        error => {
          console.error('Error fetching category', error);
          this.isLoading = false;
        }
      );
    }
}
