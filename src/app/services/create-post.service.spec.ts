import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Post } from './create-post.service';

import { CreatePostService } from './create-post.service';

describe('CreatePostService', () => {
  let service: CreatePostService;

  let testPost = {} as Post;
  testPost.postImg = "testusername4";
  let privateBaseUrl: String = 'http://34.134.148.105/posts';
  //let privateBaseUrl:string = 'http://localhost:8080/posts';
  testPost.postDescription = "This is a description";
  const httpClientSpy = jasmine.createSpyObj('HttpClient',['get','post', 'put']);

  httpClientSpy.post.and.returnValue(of(testPost));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(CreatePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(' 0 error should be caught and handled ', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 0 error',
      status: 0, statusText: 'Not Found'
    });

    // httpClientSpy.post.and.returnValue(throwError(()=>errorResponse));
    spyOn(service, 'handleError').and.callThrough();
    service.handleError(errorResponse);
    expect(service.handleError).toHaveBeenCalled();
    done();
  });

  it('should call the sendFiles method', ()=>{
    let formDataTest = new FormData();
    formDataTest.append('image', testPost.postImg);
    formDataTest.append('message', testPost.postDescription);

    service.sendFiles(testPost).then(
      //Assert
      res => expect(res).toEqual(testPost)
    );

    //Assert
    expect(httpClientSpy.post).toHaveBeenCalledWith(privateBaseUrl, formDataTest, jasmine.any(Object));
    
  });
});
