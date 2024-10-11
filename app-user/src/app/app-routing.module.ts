import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './user/home/home.component'; 
import { ProductListComponent } from './user/product-list/product-list.component';
import { LoginComponent } from './user/login/login.component';
import { CartComponent } from './user/cart/cart.component';
import { CheckoutComponent } from './user/checkout/checkout.component';

const routes: Routes = [
  // { path: 'admin/category', component: CategoryListComponent },
  // { path: 'admin/category-create', component: CategoryCreateComponent },
  // { path: 'admin/category-update/:id', component: CategoryUpdateComponent },

  // { path: 'admin/product', component: ProductListComponent },
  // { path: 'admin/product-create', component: ProductCreateComponent },
  // { path: 'admin/product-update/:id', component: ProductUpdateComponent },

  // { path: 'admin/order', component:OrderListComponent },
  // {path:'admin/user',component:UserListComponent},
   // {path :'' ,component:HomeComponent},
    { path:'danh-sach-san-pham',component : ProductListComponent},

 
    { path:"login", component : LoginComponent},
    { path:"cart" , component : CartComponent},
    { path: 'home', component: HomeComponent },

    { path: 'checkout', component: CheckoutComponent },

];

@NgModule({
  imports: [RouterModule,RouterModule.forRoot(routes), CommonModule],

  exports: [RouterModule],
})
export class AppRoutingModule {}
