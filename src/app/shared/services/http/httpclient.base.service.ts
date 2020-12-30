import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpClientBaseService {
  constructor(private http: HttpClient, private router: Router) { }

  handleError(err: HttpErrorResponse): Observable<any> {
    console.log('API ERROR:');
    console.log(err);
    return throwError(
      err.error || {
        status: 500,
        message: 'Server error'
      }
    );
  }

  get<T>(url: string, opts?: any): Observable<T> {
    return this.http.get(url, {}).pipe(
      map((res: any) => {
        return res.data;
      }),
      catchError(err => this.handleError(err))
    );
  }

  post<T>(url: string, params: any, opts?: any): Observable<T> {
    return this.http.post(url, params || {}, {}).pipe(
      map((res: any) => {
        return res.data;
      }),
      catchError(err => this.handleError(err))
    );
  }

  put<T>(url: string, params: any, opts?: any): Observable<T> {
    return this.http.put(url, params || {}, {}).pipe(
      map((res: any) => {
        return res.data;
      }),
      catchError(err => this.handleError(err))
    );
  }

  delete<T>(url: string, opts?: any): Observable<T> {
    return this.http.delete(url, {}).pipe(
      map((res: any) => {
        return res.data;
      }),
      catchError(err => this.handleError(err))
    );
  }

  patch<T>(url: string, params: any, opts?: any): Observable<T> {
    return this.http.patch(url, params, {}).pipe(
      map((res: any) => {
        return res.data;
      }),
      catchError(err => this.handleError(err))
    );
  }

  head<T>(url: string, opts?: any): Observable<T> {
    return this.http.head(url, {}).pipe(catchError(err => this.handleError(err)));
  }
}
