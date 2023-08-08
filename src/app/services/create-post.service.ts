import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface Post {
  postImg: any;
  postDescription: string;
}

@Injectable({
  providedIn: 'root',
})
export class CreatePostService {
  access_token = window.sessionStorage.getItem('access_token');

 //privateBaseUrl:string = 'http://localhost:8080';
  privateBaseUrl: String = 'http://34.134.148.105';
  //privateBaseUrl:string = "https://pixelgram-backend.work.cognizant.studio";
  private httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': ' multipart/form-data; boundary=send-post',
      'Authorization': "Bearer " + this.access_token,
    }).delete("Content-Type"),
  };

  constructor(private http: HttpClient) { }

  public sendFiles(post: any): Promise<any> {
    const formData = new FormData();


    formData.append('image', post.postImg);
    formData.append('message', post.postDescription);

    return this.http
      .post(this.privateBaseUrl + '/posts', formData, this.httpOptions)
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
    return throwError(() => new Error(error.error));
  }
}
