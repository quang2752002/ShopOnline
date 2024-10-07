import { OrderItemService } from './../../../service/orderitem/order-item.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from 'src/app/layout/admin/footer/footer.component';
import { LogoutComponent } from 'src/app/layout/admin/logout/logout.component';
import { SidebarComponent } from 'src/app/layout/admin/sidebar/sidebar.component';
import { TopbarComponent } from 'src/app/layout/admin/topbar/topbar.component';
import { Category } from 'src/app/model/category/category';
import { CategoryService } from 'src/app/service/category/category.service';
import { CommonModule } from '@angular/common';
import { Order } from 'src/app/model/order/order';
import { OrderService } from 'src/app/service/order/order-service.service';
import { OrderItem } from 'src/app/model/orderitem/order-item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    TopbarComponent,
    LogoutComponent,
    FooterComponent,
  ],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css',
    './../../../../assets/vendor/fontawesome-free/css/all.min.css',
    './../../../../assets/css/sb-admin-2.min.css',
  ],
})
export class OrderListComponent implements OnInit {
  list: Order[] = [];
  index: number = 1;
  size: number = 5;
  totalPages: number = 1;
  pageSizes: number[] = [5, 10, 15, 20];
  listActive: string[] = ['pending', 'completed', 'cancelled'];
  isActive: string = "";
  loading: boolean = false;
  errorMessage: string | null = null;
  listOrderItems: OrderItem[] = [];
  selectedOrderId: string = "";
  isOrderDetailVisible: boolean = false;


  constructor(
    private service: OrderService,
    private orderItemService: OrderItemService,
    private cookieService: CookieService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    if (!this.cookieService.get('token')) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadList();
  }

  loadList(): void {
    this.loading = true;
    this.service.refreshList( this.index, this.size, this.isActive)
      .subscribe(
        res => {
          this.list = res.orders;
          this.totalPages = Math.ceil(res.total / this.size);
          this.loading = false;
          this.errorMessage = null;

          if (this.list.length === 0) {
            this.listOrderItems = [];
            this.isOrderDetailVisible = false;
          }
        },
        error => {
          this.loading = false;
          this.errorMessage = error;
          console.error('Error loading orders', error);
        }
      );
  }

  loadOrderDetails(orderId: string): void {
    this.selectedOrderId = orderId;
    this.orderItemService.refreshList( orderId)
      .subscribe(
        (orderDetails: OrderItem[]) => {
          this.listOrderItems = orderDetails;
          this.isOrderDetailVisible = true;
        },
        error => {
          console.error('Error loading order details', error);
        }
      );
  }

  onActiveChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.isActive = target.value;
    this.index = 1;
    this.loadList();  // Reload the list based on the selected status
    this.listOrderItems = [];  // Reset order items
    this.isOrderDetailVisible = false; // Hide order details
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.size = Number(target.value);
    this.index = 1;
    this.loadList();
    this.listOrderItems = [];
    this.isOrderDetailVisible = false;
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.index = newPage;
      this.loadList();
      this.listOrderItems = [];
      this.isOrderDetailVisible = false;
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

  onDelete(id: string): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');

    if (confirmDelete) {
      this.service.delete( id).subscribe(
        () => {
          this.loadList();
          console.log('Order deleted successfully');
        },
        error => {
          console.error('Error deleting order', error);
          this.errorMessage = error;
        }
      );
    }
  }
  updateOrderStatus(status: string): void {
    if (this.selectedOrderId) {
      const confirmAction = window.confirm(`Are you sure you want to ${status} this order?`);

      if (confirmAction) {
        this.service.changeActive( this.selectedOrderId, status).subscribe(
          () => {
            this.loadList();
            this.snackBar.open(`${status.charAt(0).toUpperCase() + status.slice(1)} successfully.`, 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          error => {
            this.snackBar.open(`${status.charAt(0).toUpperCase() + status.slice(1)} Error. Please try again.`, 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
            console.error(`Error ${status} order`, error);
            this.errorMessage = error;
          }
        );
      }
    } else {
      this.snackBar.open(`${status.charAt(0).toUpperCase() + status.slice(1)} Failed. Please try again.`, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    this.isOrderDetailVisible = false;
  }

  confirmOrder(): void {
    this.updateOrderStatus("completed");
  }

  cancelOrder(): void {
    this.updateOrderStatus("cancelled");
  }

}
