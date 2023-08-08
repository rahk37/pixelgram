import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError, throwError } from 'rxjs';

export interface User {
  username:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  baseUrl:string = 'http://34.134.148.105';
  //baseUrl:string = 'http://localhost:8080';
   //private baseUrl:string = "https://pixelgram-backend.work.cognizant.studio";


  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  }

  constructor(private httpClient:HttpClient) {}

  async authenticateUser(user:User):Promise<any> {
    let body = `username=${user.username}&password=${user.password}`;

    return this.httpClient.post(
      String(this.baseUrl + '/oauth/token'),
      body, this.httpHeaders
      ).pipe(
        map((response:any) => {
          console.log(response);
          return response;
        }), catchError(this.handleError)
      ).toPromise();
  }

  isLoggedIn(): boolean {
    return window.sessionStorage.getItem('access_token') !== null;
  }

  deleteToken() {
    window.sessionStorage.removeItem('access_token');
  }

  public handleError(error:HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);

    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(
      () => new Error(error.error.message)
    );
  }

  public getUser(): boolean {
    return window.sessionStorage.getItem('access_token') == null ? false : true;
  }

  public checkUserExistsOnBackend(user: string):  Promise<boolean | undefined> {
    let body = `users?filter=${user}&pageNumber=15&pageSize=15`
    let exists = this.httpClient.get(
      body, this.httpHeaders
      ).pipe(
        map((response:any) => {
          console.log(response);
          if (response.numberOfElements > 0){
            return true;
          }
          else {
            return false;
          }
        }), catchError(this.handleError)
      ).toPromise();
    return exists;
  }
}

