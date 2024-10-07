import { Category } from './../../model/category/category';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url: string = environment.apiBaseUrl + '/Category';
  list: Category[] = [];

  constructor(private http: HttpClient,private cookieService: CookieService,
  ) {}

  refreshList(
    
    name: string = '',
    page: number = 1,
    size: number = 10
  ): Observable<{ categories: Category[]; total: number }> {
    var token=this.cookieService.get('token');

    let params = new HttpParams()
      .set('name', name)
      .set('page', page.toString())
      .set('size', size.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // or whatever scheme you're using
    });

    return this.http
      .get<{ categories: Category[]; total: number }>(
        `${this.url}/get-category`,
        { params, headers }
      )
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

  createCategory( name: string,description: string): Observable<Category> {
    var token=this.cookieService.get('token');

    const body = { Name: name, Description: description }; // Set the body correctly
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post<Category>(`${this.url}/create-category`, body, { headers }) // Pass headers correctly
      .pipe(catchError(this.handleError));
  }



  getCategory( id: string): Observable<any> {
   
    return this.http
      .get<any>(`${this.url}/get-category/` + id)
      .pipe(catchError(this.handleError));
  }
  updateCategory(id:string,name: string,description: string,isActive:boolean): Observable<any>  {
    var token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const body = {id:id, Name: name, Description: description,isActive:isActive };
    return this.http
    .patch<Category>(`${this.url}/update`, body, { headers })
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
  getList():Observable<any>{
    
    var token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.url}/get-list/`,{headers})
    .pipe(catchError(this.handleError));
  }
}
