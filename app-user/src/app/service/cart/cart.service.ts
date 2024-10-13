import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Cart } from 'src/app/model/cart/cart';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url: string = environment.apiBaseUrl + '/Cart';
  private ids: string[] = [];

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Error handling function
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Backend returned code ${error.status}, message was: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  setCartIds(ids: string[]) {
    this.ids = ids;
  }

  getCartIds(): string[] {
    return this.ids;
  }
  // Updated AddCart method using POST
  AddCart(productId: string, quantity: number): Observable<any> {
    // Getting the token from cookies
    const token = this.cookieService.get('token');

    // Setting up the headers with Authorization token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Preparing the body for POST request
    const body = {
      productId: productId,
      quantity: quantity,
    };

    return this.http
      .post<Cart>(`${this.url}/add-cart`, body, { headers })
      .pipe(catchError(this.handleError)); 
  }
  refreshList(): Observable<any> {
    var token = this.cookieService.get('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<any>(`${this.url}/get-cart`, { headers })
      .pipe(catchError(this.handleError));
  }
  updateCart(productId: string, quantity: number): Observable<any> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      productId: productId,
      quantity: quantity,
    };

    return this.http
      .patch<Cart>(`${this.url}/update-cart`, body, { headers }) 
      .pipe(catchError(this.handleError)); 
  }
  
  getCartCheckOut(ids: string[]): Observable<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Create HttpParams with multiple 'id' parameters
    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('id', id); // append each id as a separate query parameter
    });
  
    return this.http
      .get<any[]>(`${this.url}/get-cart-checkout`, { headers, params })
      .pipe(catchError(this.handleError));
  }
  
  
}
