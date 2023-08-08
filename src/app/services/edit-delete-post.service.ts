import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Post } from '../post/post.component';

@Injectable({
  providedIn: 'root'
})
export class EditDeletePostService {

  private baseUrl:string = 'http://34.134.148.105';
  //baseUrl:string = 'http://localhost:8080';
  //private baseUrl:string = "https://pixelgram-backend.work.cognizant.studio";

  // private baseUrl:string = "https://pixelgram-backend.work.cognizant.studio";
  //"http://34.134.148.105";
  // baseUrl:string = "http://localhost:8080";
  private access_token = window.sessionStorage.getItem('access_token');

  private httpHeaders = {
    headers: new HttpHeaders({
      'Authorization': "Bearer " + this.access_token
    }).delete('Content-Type')
  };

  constructor(private httpClient:HttpClient) { }

  public editPost(post:Post): Promise<any> {
    let formData = new FormData();
    formData.append('message', post.message);

    return this.httpClient.put(
      this.baseUrl + '/posts/' + post.id, formData, this.httpHeaders
    ).pipe(
      map((response:any) => {
        return response;
      }), catchError(this.handleError)
    ).toPromise();
  }

  public deletePost(post:Post):Promise<any> {
    return this.httpClient.delete(
      this.baseUrl + '/posts/' + post.id, this.httpHeaders
    ).pipe(
      map((response:any) => {
        return response;
      }), catchError(this.handleError)
    ).toPromise();
  }

  handleError(error:HttpErrorResponse) {

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
}
