import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from 'src/app/model/product/product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
  url:string=environment.apiBaseUrl+'/Product';
  list: Product[] = [];
  constructor(private http: HttpClient,private cookieService:CookieService) {}
  refreshList( name: string = '', categoryId: string | null,sorting:string='',
     page: number = 1, size: number = 10): Observable<{ products: Product[], total: number }> {
    let params = new HttpParams()
      .set('name', name)
      
      .set('sorting',sorting)
      .set('page', page.toString())
      .set('size', size.toString());

    if (categoryId) {
      params = params.set('categoryId', categoryId);
    }
    
   


    return this.http
      .get<{ products: Product[], total: number }>(`${this.url}/get-list`, { params })
      .pipe(catchError(this.handleError));
}



  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
