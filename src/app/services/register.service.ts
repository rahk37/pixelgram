import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
export interface User {
  username: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
  privateBaseUrl:string = 'http://34.134.148.105/';
  //privateBaseUrl: String ='http://localhost:8080/';
   //privateBaseUrl:string = 'https://pixelgram-backend.work.cognizant.studio/';


  registerUser(user: User): Promise<any> {
    let body = `username=${user.username}&password=${user.password}`;
    console.log("in register service:", body);

    return this.httpClient
      .post(
        String(this.privateBaseUrl + 'oauth/register'),
        body,
        this.httpOptions
      )
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      )
      .toPromise();
  }
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(() => new Error(error.error.message));
  }
}
