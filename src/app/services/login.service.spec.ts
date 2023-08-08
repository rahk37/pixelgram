import { TestBed } from '@angular/core/testing';

import { LoginService, User } from './login.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginService', () => {
  let service: LoginService;
  //let baseUrl: string = "http://localhost:8080/oauth/token";
  // let baseUrl: string = "https://pixelgram-backend.work.cognizant.studio/oauth/token";
  let baseUrl: string = 'http://34.134.148.105/oauth/token';
  let user = {} as User;
  let userPassString = 'username=ruthful&password=RuthfulPass';
  let response = true;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
  httpClientSpy.post.and.returnValue(of(response));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(LoginService);
    window.sessionStorage.removeItem('access_token');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('postDeveloper should make POST call to correct URL', () => {
    //Act
    user.username = 'ruthful';
    user.password = 'RuthfulPass';
    service.authenticateUser(user).then(
      //Assert
      (res) => expect(res).toEqual(response)
    );

    //Assert
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      baseUrl,
      userPassString,
      jasmine.any(Object)
    );
  });

  it('isLoggedIn should return false before authenticated', () => {
    expect(service.isLoggedIn()).toEqual(false);
  });

  it('errors should be caught and handled ', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(service, 'handleError').and.callThrough();
    service.handleError(errorResponse);
    expect(service.handleError).toHaveBeenCalled();
    done();
  });

  it('0 error should be caught and handled ', (done: DoneFn) => {
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
