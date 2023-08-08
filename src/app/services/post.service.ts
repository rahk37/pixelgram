import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, map, throwError, catchError, of } from 'rxjs';
import { SearchbarComponent } from '../navbar/searchbar/searchbar.component';
import { Post, Comment } from '../post/post.component';

@Injectable({
  providedIn: 'root',
})
export class PostService {
   //private baseUrl: String = 'https://pixelgram-backend.work.cognizant.studio/posts';
  //private baseUrl: String ='http://localhost:8080/posts';
  baseUrl:string = 'http://34.134.148.105/posts';


  private searchBarInputMainPage:string = "";
  private posts:Post[] = [];

  private postHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Bearer ' + window.sessionStorage.getItem('access_token')?.toString(),
    }),
  }; // for logged in users

  private postHeaderUnauth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }; // for unregistered/unlogged in

  constructor(private httpClient: HttpClient) {}

   refDate = new Date(1995,12,10);




  getUserPosts(username: string) {
    if (window.sessionStorage.getItem('access_token') != null) {
      //console.log(window.sessionStorage.getItem('access_token'));

      const postHeadersAuth = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            window.sessionStorage.getItem('access_token')?.toString(),
        }),
      };
      //

      return this.httpClient
        .get<any>(
          String(this.baseUrl+ '/' + username + '?pageNumber=0&pageSize=50'),
          this.postHeaderUnauth
        )
        .pipe(
          catchError((error) => {
            console.log('error reached not Logged in');
            return of({content: []})
          }));
    } else {
      return this.httpClient
        .get<any>(
          String(this.baseUrl + '/' + username + '?pageNumber=0&pageSize=50'),
          this.postHeaderUnauth
        )
        .pipe(
          catchError((error) => {
            console.log('error reached not Logged in');
            return of({content: []})
          }));
    }
  }

  getPosts(): Observable<any> {
    if (window.sessionStorage.getItem('access_token') != null) {

      const postHeadersAuth = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            window.sessionStorage.getItem('access_token')?.toString(),
        }),
      };
      //

      return this.httpClient
        .get<any>(
          String(this.baseUrl + '?pageNumber=0&pageSize=5')
        )
        .pipe(
          catchError((error) => {
            return of({
              content: [
                {
                  author: {
                    id: 0,
                    username: 'jason.monroe',
                    profileImageUrl: null,
                  },
                  comments: {
                    content: [
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas',
                          profileImageUrl: null,
                        },
                        createdOn: this.refDate.setMinutes(this.refDate.getMinutes()+1).toLocaleString(),
                        id: 191,
                        message: 'Message messaging',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas1',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging1',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging2',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas3',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging3',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas4',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging4',
                        postId: 190,
                      },
                    ],
                  },
                  createdOn: Date.now().toLocaleString(),
                  hasLiked: false,
                  id: 0,
                  imageUrl: '../assets/too_wide.png',
                  likeCount: 14,
                  message:
                    'too wide, I live in a Van down by the river and I woke up and went to the store',
                },
                {
                  author: {
                    id: 1,
                    username: 'chief_keef',
                    profileImageUrl: null,
                  },
                  comments: {
                    content: [
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas7',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging7',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas7',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging17',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging277',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas377',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging3777',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas477',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging4777',
                        postId: 190,
                      },
                    ],
                  },
                  createdOn: Date.now().toLocaleString(),
                  hasLiked: false,
                  id: 1,
                  imageUrl: '../assets/too_tall.png',
                  likeCount: 14,
                  message:
                    'too tall too wide, I live in a Van down by the river and I woke up and went to the store',
                },
                {
                  author: {
                    id: 2,
                    username: 'kim_k',
                    profileImageUrl: null,
                  },
                  comments: {
                    content: [
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas345',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging35334',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas1',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging13444',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas33443',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging3344',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas5553',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging34509',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas309477',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging34442',
                        postId: 190,
                      },
                    ],
                  },
                  createdOn: Date.now().toLocaleString(),
                  hasLiked: false,
                  id: 2,
                  imageUrl: '../assets/too_big.png',
                  likeCount: 14,
                  message: 'too big',
                },
              ],
            });
          })
        );
    } else {
      return this.httpClient
        .get<any>(
          String(this.baseUrl + '?pageNumber=0&pageSize=5'),
          this.postHeaderUnauth
        )
        .pipe(
          catchError((error) => {
            console.log('error reached not Logged in');
            return of({
              content: [
                {
                  author: {
                    id: 0,
                    username: 'jason.monroe',
                    profileImageUrl: null,
                  },
                  comments: {
                    content: [
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas1',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging1',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging2',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas3',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging3',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas4',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging4',
                        postId: 190,
                      },
                    ],
                  },
                  createdOn: Date.now().toLocaleString(),
                  hasLiked: false,
                  id: 0,
                  imageUrl: '../assets/too_wide.png',
                  likeCount: 14,
                  message:
                    'too wide, I live in a Van down by the river and I woke up and went to the store',
                },
                {
                  author: {
                    id: 1,
                    username: 'chief_keef',
                    profileImageUrl: null,
                  },
                  comments: {
                    content: [
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas7',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging7',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas7',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging17',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging277',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas377',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging3777',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas477',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging4777',
                        postId: 190,
                      },
                    ],
                  },
                  createdOn: Date.now().toLocaleString(),
                  hasLiked: false,
                  id: 1,
                  imageUrl: '../assets/too_tall.png',
                  likeCount: 14,
                  message:
                    'too tall too wide, I live in a Van down by the river and I woke up and went to the store',
                },
                {
                  author: {
                    id: 2,
                    username: 'kim_k',
                    profileImageUrl: null,
                  },
                  comments: {
                    content: [
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas345',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging35334',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas1',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging13444',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas33443',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging3344',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas5553',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging34509',
                        postId: 190,
                      },
                      {
                        author: {
                          id: 102991,
                          username: 'ssasas309477',
                          profileImageUrl: null,
                        },
                        createdOn: Date.now().toLocaleString(),
                        id: 191,
                        message: 'Message messaging34442',
                        postId: 190,
                      },
                    ],
                  },
                  createdOn: Date.now().toLocaleString(),
                  hasLiked: false,
                  id: 2,
                  imageUrl: '../assets/too_big.png',
                  likeCount: 14,
                  message: 'too big',
                },
              ],
            });
          })
        );
    }
  }

  getMorePosts(pageNumber: number): Observable<any> {
    if (window.sessionStorage.getItem('access_token') != null) {
      //console.log(window.sessionStorage.getItem('access_token'));

      const postHeadersAuth = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            window.sessionStorage.getItem('access_token')?.toString(),
        }),
      };

      return this.httpClient.get<any>(
        String(this.baseUrl + '?pageNumber=' + pageNumber + '&pageSize=5'),
        this.postHeaderUnauth
      );
    } else {
      const postHeadersUnauth = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

      return this.httpClient.get<any>(
        String(this.baseUrl + '?pageNumber=' + pageNumber + '&pageSize=5'),
        postHeadersUnauth
      );
    }
  }

  postComment(comment: string, id: number):Promise<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization:
          'Bearer ' + window.sessionStorage.getItem('access_token'),
      }),
    };

    let url = this.baseUrl + '/' + id.toString() + '/comments';

    let bodyData = {
      createdOn: '',
      id: 0,
      postId: id,
      author: {
        id: 0,
        username: 'string',
        profileImageUrl: 'string',
      },
      message: comment,
      editMode: false,
    };

    return this.httpClient.post(url, bodyData, httpOptions).pipe(
      map((response:any) => {
        return response;
      }), catchError(this.handleError)
    ).toPromise();
  }
  updateComments(comment:Comment):Promise<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization:
          'Bearer ' + window.sessionStorage.getItem('access_token'),
      }),
    };
    let url = this.baseUrl + '/' + comment.postId.toString() + '/comments/'+comment.id;
    let bodyData = {
      createdOn: '',
      id: 0,
      postId: comment.postId,
      author: {
        id: comment.author.id,
        username: comment.author.username,
        profileImageUrl: comment.author.profileImageUrl,
      },
      message: comment.message,
      editMode: comment.editMode
    };
    return this.httpClient.put<any>(url, bodyData, httpOptions).pipe(
      map((response:any) => {
        return response;
      }), catchError(this.handleError)
    ).toPromise();

  }

  getCommentsAPI(post: Post, pageNumber: number) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.httpClient.get<any>(
      this.baseUrl +
        '/' +
        post.id.toString() +
        '/comments?pageNumber=' +
        pageNumber +
        '&pageSize=5'
    );
  }

  postlikes(id: number, post: Post) {
    console.log(post);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization:
          'Bearer ' + window.sessionStorage.getItem('access_token')?.toString(),
      }),
    };

    let url = this.baseUrl + '/' + id.toString() + '/likes';

    return this.httpClient
      .post<any>(String(url), {}, httpOptions)
      .subscribe();
  }

  deleteLikes(id: number) {
    console.log(id);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        Authorization:
          'Bearer ' + window.sessionStorage.getItem('access_token')?.toString(),
      }),
    };

    let url = this.baseUrl + '/' + id.toString() + '/likes';

    return this.httpClient
      .delete<any>(String(url), httpOptions)
      .subscribe();
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
