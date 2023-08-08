import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {
  /*--- variables ---*/
  //loading:boolean = false;

 filter = new BehaviorSubject("");
 loading = new BehaviorSubject(false);

  // private baseUrl:string = 'http://localhost:8080';
  private baseUrl:string = 'http://34.134.148.105';

  //private baseUrl:string = 'https://pixelgram-backend.work.cognizant.studio'


  /*--- headers ---*/
  private httpHeaders = {
    headers: new HttpHeaders({ // for logged in users
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
  }; 
  private postHeaderUnauth = { // for unregistered/unlogged in
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }; 

  /*--- functions ---*/
  
  constructor(private httpClient: HttpClient) { }

  setLoading(loading:boolean) {
    this.loading.next(loading);
  }

  getLoading():Observable<boolean> {
    return this.loading.asObservable();
  }

  setFilter(input:string){
    this.filter.next(input);
  }

  getSearchFilter(){
    return this.filter.asObservable();
  }


  getFilteredPosts():Promise<any> {
    return this.httpClient.get(
    String(this.baseUrl + '/posts?pageNumber=0&pageSize=5&filter=' + this.filter.value),
    this.httpHeaders
    ).pipe(
      map((response:any) => {
        return response;
      }), catchError(this.handleError)
    ).toPromise();
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
}
