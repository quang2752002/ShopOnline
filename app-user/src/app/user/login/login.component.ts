import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService 
  ) {}
 
  onSubmit() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.token) {
          this.cookieService.set('token', response.token);
          this.router.navigate(['/danh-sach-san-pham']);
        } else {
          this.errorMessage = 'Invalid login response';
        }
      },
      error: (error) => {
        this.errorMessage = error.message || 'An error occurred';
      }
    });
  }
}


 // // Đọc một cookie
  // getCookie() {
  //   const user = this.cookieService.get('user');
  //   console.log('User:', user);
  // }

  // // Xóa một cookie
  // deleteCookie() {
  //   this.cookieService.delete('user');
  //}