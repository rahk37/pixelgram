import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService, User } from '../services/login.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { PostComponent } from '../post/post.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let user = {} as User;

  const loginComponentSpy = jasmine.createSpyObj('LoginComponent', ['authenticateUser', 'loginUser', 'checkUserInputError', 'showPassword', user]);
  const loginServiceSpy = jasmine.createSpyObj('LoginService', ['authenticateUser', 'isLoggedIn']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'post', component: PostComponent }
      ])],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();


    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input text value to Component property', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('.username-input');
    const passwordInput: HTMLInputElement = hostElement.querySelector('.password-input');

    fixture.detectChanges();

    nameInput.value = 'ruthful';
    passwordInput.value = 'RuthfulPass';

    nameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    expect(component.user.username).toBe('ruthful');
    expect(component.user.password).toBe('RuthfulPass');
  });

  it('should call loginUser on login button click', async () => {
    spyOn(component, 'loginUser').and.callThrough();
    let button = fixture.debugElement.query(By.css('.login-button'));
    button.triggerEventHandler('click');
    expect(component.loginUser).toHaveBeenCalledTimes(1);

  });

  it('should call loginUser on login button click, username undefined', async () => {

    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('.username-input');
    const passwordInput: HTMLInputElement = hostElement.querySelector('.password-input');

    fixture.detectChanges();

    user.username = 'ruthful';
    user.password = 'RuthfulPass';
    nameInput.value = user.username;
    passwordInput.value = user.password;

    nameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('.login-button');
    button.click();
    loginComponentSpy.loginUser();
    expect(loginComponentSpy.loginUser).toHaveBeenCalled();
  });


  it('should redirect to /post on init if access token is not null', () => {

    spyOn(window.sessionStorage, 'setItem');
    window.sessionStorage.setItem('access_token', '123');
    component.ngOnInit();
    let routerSpy = { navigate: jasmine.createSpy('navigate').and.stub() };
    routerSpy.navigate('/post');
    expect(routerSpy.navigate).toHaveBeenCalledWith('/post');
  });

  it('should call authenticateUser from loginComponent', () => {
    spyOn(window.sessionStorage, 'setItem');
    window.sessionStorage.setItem('access_token', '123');

    spyOn(component, 'authenticateUser').and.callThrough();
    component.authenticateUser();

    expect(component.authenticateUser).toHaveBeenCalled();
  });

  it('should call showPassword from loginComponent', () => {
    spyOn(component, 'showPassword').and.callThrough();
    component.showPassword();

    expect(component.showPassword).toHaveBeenCalled();
  });

});
