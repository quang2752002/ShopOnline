import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/model/user/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = environment.apiBaseUrl + '/Account';

  constructor(private http: HttpClient,private cookieService:CookieService) {}

  getUsers(  
    name: string = '',
    page: number = 1,
    size: number = 10
  ): Observable<{ users: User[]; total: number }> {
    var token=this.cookieService.get('token');

    let params = new HttpParams()
      .set('name', name)
      .set('page', page.toString())
      .set('size', size.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });

    return this.http
      .get<{ users: User[]; total: number }>(
        `${this.url}/get-users`,
        { params, headers }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
