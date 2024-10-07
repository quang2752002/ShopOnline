import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { CategoryCreateComponent } from './admin/category/category-create/category-create.component';
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { LoginComponent } from './admin/login/login.component';
import { CommonModule } from '@angular/common';
import { CategoryUpdateComponent } from './admin/category/category-update/category-update.component';
import { ProductCreateComponent } from './admin/product/product-create/product-create.component';
import { ProductUpdateComponent } from './admin/product/product-update/product-update.component';
import { OrderListComponent } from './admin/order/order-list/order-list.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';

const routes: Routes = [
  { path: 'admin/category', component: CategoryListComponent },
  { path: 'admin/category-create', component: CategoryCreateComponent },
  { path: 'admin/category-update/:id', component: CategoryUpdateComponent },

  { path: 'admin/product', component: ProductListComponent },
  { path: 'admin/product-create', component: ProductCreateComponent },
  { path: 'admin/product-update/:id', component: ProductUpdateComponent },

  { path: 'admin/order', component:OrderListComponent },
  {path:'admin/user',component:UserListComponent},




  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule,RouterModule.forRoot(routes), CommonModule],

 // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

