import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  // { path: 'admin/category', component: CategoryListComponent },
  // { path: 'admin/category-create', component: CategoryCreateComponent },
  // { path: 'admin/category-update/:id', component: CategoryUpdateComponent },

  // { path: 'admin/product', component: ProductListComponent },
  // { path: 'admin/product-create', component: ProductCreateComponent },
  // { path: 'admin/product-update/:id', component: ProductUpdateComponent },

  // { path: 'admin/order', component:OrderListComponent },
  // {path:'admin/user',component:UserListComponent},




  { path: '', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule,RouterModule.forRoot(routes), CommonModule],

  exports: [RouterModule],
})
export class AppRoutingModule {}
