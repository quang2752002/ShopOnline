import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Product } from '../../model/product/product';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Observable,Observer,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url:string=environment.apiBaseUrl+'/Product';
  list: Product[] = [];
  constructor(private http: HttpClient,private cookieService:CookieService) {}
  refreshList( name: string = '', categoryId: string | null, page: number = 1, size: number = 10): Observable<{ products: Product[], total: number }> {
    let params = new HttpParams()
      .set('name', name)
      .set('page', page.toString())
      .set('size', size.toString());

    if (categoryId) {
      params = params.set('categoryId', categoryId);
    }
    var token=this.cookieService.get('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<{ products: Product[], total: number }>(`${this.url}/get-product`, { params, headers })
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


  create(name:string,description:string,price:number,quantity:number,selectedCategoryId:string):Observable<any>{
    const body = { Name: name, Description: description ,price:price,quantity:quantity,categoryId:selectedCategoryId }; // Set the body correctly
    var token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<Product>(`${this.url}/create-product`, body, { headers }) // Pass headers correctly
      .pipe(catchError(this.handleError));
    }
    update(id:string,name:string,description:string,price:number,quantity:number,selectedCategoryId:string):Observable<any>{
      const body={ id: id, name: name ,description: description ,price: price ,quantity: quantity ,categoryId:selectedCategoryId};
      var token=this.cookieService.get('token');

      const headers=new HttpHeaders({
        Authorization: `Bearer ${token}`,

      })
      return this.http
      .patch<Product>(`${this.url}/update-product`,body,{headers})
      .pipe(catchError(this.handleError));
    }
    getProduct( id: string): Observable<any> {
      
      return this.http
        .get<any>(`${this.url}/get-product/` + id)
        .pipe(catchError(this.handleError));
    }

  delete(id:string):Observable<any>{
    var token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(`${this.url}/delete/`+id,{headers})
    .pipe(catchError(this.handleError));
  }

}
