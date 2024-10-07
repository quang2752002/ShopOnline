import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Observable,Observer,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from 'src/app/model/order/order';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url:string=environment.apiBaseUrl+'/Order';
  list: Order[] = [];
  constructor(private http: HttpClient,private cookieService:CookieService) {}
  refreshList(// name: string = '',
     page: number = 1,
     size: number = 10 ,isActive:string): Observable<{ orders: Order[], total: number }> {
    let params = new HttpParams()
      //.set('name', name)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('isActive',isActive);
      
      var token=this.cookieService.get('token');



    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<{ orders: Order[], total: number }>(`${this.url}/get-order`, { params, headers })
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
      .post<Order>(`${this.url}/create-order`, body, { headers }) // Pass headers correctly
      .pipe(catchError(this.handleError));
    }
    update(id:string,name:string,description:string,price:number,quantity:number,selectedCategoryId:string):Observable<any>{
      const body={ id: id, name: name ,description: description ,price: price ,quantity: quantity ,categoryId:selectedCategoryId};
      var token=this.cookieService.get('token');

      const headers=new HttpHeaders({
        Authorization: `Bearer ${token}`,

      })
      return this.http
      .patch<Order>(`${this.url}/update-order`,body,{headers})
      .pipe(catchError(this.handleError));
    }
    getorder( id: string): Observable<any> {
      var token=this.cookieService.get('token');

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http
        .get<any>(`${this.url}/get-order/` + id, { headers })
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
  getOrderDetails(id:string):Observable<any>{
    var token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(`${this.url}/delete/`+id,{headers})
    .pipe(catchError(this.handleError));

    }

    changeActive( id: string, isActive: string): Observable<any> {
      var token=this.cookieService.get('token');

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      let params = new HttpParams()
        .set('id', id)
        .set('isActive', isActive);

      return this.http.patch(`${this.url}/change-active`, null, { params, headers, responseType: 'text' })
        .pipe(catchError(this.handleError));
    }


}

