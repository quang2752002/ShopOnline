import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';
import { Category } from 'src/app/model/category/category';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string = environment.apiBaseUrl + '/Category';
  list: Category[] = [];
  constructor(private http: HttpClient,private cookieService: CookieService,
  ) {}
  getList():Observable<any>{
    
    
    return this.http.get<any>(`${this.url}/get-list/`)
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
