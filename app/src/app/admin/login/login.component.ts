import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/css/sb-admin-2.min.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService // Inject CookieService
  ) {}

  onSubmit() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {

        this.cookieService.set('token', response.token); 

        if(response.role=="Admin"){
          this.router.navigate(['/admin/category']);
        }
        if(response.role=="User")
          this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'An error occurred';
      }
    });
  }
}
