import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from 'src/app/model/product/product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url:string=environment.apiBaseUrl+'/Order';
  constructor(private http: HttpClient,private cookieService:CookieService) {}
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
  checkOut(id: string[], name: string, address: string, phone: string, note: string): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      Id: id,
      Name: name,
      Phone: phone,
      Address: address,
      Note: note,
    };
  
    // Add 'responseType' option if backend returns non-JSON (e.g., plain text or empty)
    return this.http.post<any>(`${this.url}/check-out`, body, { headers, responseType: 'text' as 'json' })
      .pipe(catchError(this.handleError));
  }
  
}
