import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Post } from '../post/post.component';

import { EditDeletePostService } from './edit-delete-post.service';

describe('EditDeletePostService', () => {
  let service: EditDeletePostService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['put', 'delete']);
  let post = {} as Post;
  let response = true;
  let baseUrl: string = "http://34.134.148.105";
  //let baseUrl:string='http://localhost:8080';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
            { provide: HttpClient, useValue:httpClientSpy }
          ],
    });
    service = TestBed.inject(EditDeletePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should edit post description', () => {
    let formData = new FormData();
    httpClientSpy.put.and.returnValue(of(response));

    formData.append('message', 'Test description');
    service.editPost(post).then(
      res => expect(res).toEqual(response)
    );

    expect(httpClientSpy.put).toHaveBeenCalledWith(baseUrl+'/posts/' + post.id, formData, jasmine.any(Object));
  });

  it('should delete post', () => {
    httpClientSpy.delete.and.returnValue(of(response));
    service.deletePost(post).then(
      res => expect(res).toEqual(response)
    );

    expect(httpClientSpy.delete).toHaveBeenCalledWith(baseUrl+'/posts/' + post.id, jasmine.any(Object));
  });

  it('errors should be caught and handled ', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    spyOn(service, 'handleError').and.callThrough();
    service.handleError(errorResponse);
    expect(service.handleError).toHaveBeenCalled();
    done();
  });

    it('0 error should be caught and handled ', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 0 error',
      status: 0, statusText: 'Not Found'
    });

    spyOn(service, 'handleError').and.callThrough();
    service.handleError(errorResponse);
    expect(service.handleError).toHaveBeenCalled();
    done();
  });
});