import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { RegisterService, User } from '../services/register.service';

describe('RegisterService', () => {
  let service: RegisterService;

  let testUser = {} as User;
  testUser.username = 'testusername4';
  testUser.password = 'testpassword1';
  let body = `username=${testUser.username}&password=${testUser.password}`;

  let baseUrl: String = 'http://34.134.148.105/oauth/register';
  //let baseUrl: string = 'http://localhost:8080/oauth/register'
  //   'https://pixelgram-backend.work.cognizant.studio/oauth/register';

  const httpClientSpy = jasmine.createSpyObj('HttpClient', [
    'get',
    'post',
    'put',
  ]);

  httpClientSpy.post.and.returnValue(of(testUser));

  beforeEach(() => {
    //spyOn(httpClientSpy, 'post').and.returnValue(of(error));

    // jasmine.createSpy('handleError').and.callThrough();

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('registerUser should make POST call to correct URL', () => {
    //Act
    service.registerUser(testUser).then(
      //Assert
      (res) => expect(res).toEqual(testUser)
    );

    //Assert
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      baseUrl,
      body,
      jasmine.any(Object)
    );
  });

  it(' 0 error should be caught and handled ', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 0 error',
      status: 0,
      statusText: 'Not Found',
    });
    spyOn(service, 'handleError').and.callThrough();
    service.handleError(errorResponse);
    expect(service.handleError).toHaveBeenCalled();
    done();
  });
});
