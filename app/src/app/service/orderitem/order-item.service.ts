import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, Observer, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { OrderItem } from 'src/app/model/orderitem/order-item';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService {
  url: string = environment.apiBaseUrl + '/OrderItem';
  list: OrderItem[] = [];
  constructor(private http: HttpClient,private cookieService:CookieService) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  create(
    
    name: string,
    description: string,
    price: number,
    quantity: number,
    selectedCategoryId: string
  ): Observable<any> {
    const body = {
      Name: name,
      Description: description,
      price: price,
      quantity: quantity,
      categoryId: selectedCategoryId,
    }; // Set the body correctly
    var token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<OrderItem>(`${this.url}/create-OrderItem`, body, { headers }) // Pass headers correctly
      .pipe(catchError(this.handleError));
  }
  update(
    
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    selectedCategoryId: string
  ): Observable<any> {
    const body = {
      id: id,
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      categoryId: selectedCategoryId,
    };
    var token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .patch<OrderItem>(`${this.url}/update-OrderItem`, body, { headers })
      .pipe(catchError(this.handleError));
  }
  refreshList( id: string): Observable<any> {
    var token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<any>(`${this.url}/get-orderItem/` + id, { headers })
      .pipe(catchError(this.handleError));
  }

  delete( id: string): Observable<any> {
    var token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .delete<any>(`${this.url}/delete/` + id, { headers })
      .pipe(catchError(this.handleError));
  }
  
}
