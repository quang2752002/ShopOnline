import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/admin/sidebar/sidebar.component';
import { TopbarComponent } from './layout/admin/topbar/topbar.component';
import { FooterComponent } from './layout/admin/footer/footer.component';
import { LogoutComponent } from './layout/admin/logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import here

// Import các component standalone
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { CategoryCreateComponent } from './admin/category/category-create/category-create.component';
import { CategoryUpdateComponent } from './admin/category/category-update/category-update.component';
import { OrderListComponent } from './admin/order/order-list/order-list.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    CategoryListComponent,
    CategoryCreateComponent,
    ProductListComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    LogoutComponent,
    CategoryUpdateComponent,
    OrderListComponent,
    UserListComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule { }
