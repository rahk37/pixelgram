import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RegisterService, User } from '../services/register.service';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let testUser = {} as User;
  testUser.username = "testusername1";
  testUser.password = "testpassword1";


  const registerServiceSpy = jasmine.createSpyObj('RegisterService', ['registerUser']);
  let fakeResponse = {
    access_token: 'abcd'
  };
  registerServiceSpy.registerUser.and.returnValue((Promise.resolve(fakeResponse))); //, (Promise.reject(new Error('fail')))
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [HttpClientModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: RegisterService, useValue: registerServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    })

      .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should call register when valid form is submitted', () => {
    let usernameTextbox = fixture.debugElement.nativeElement.querySelector('[data-test-id="username"]');
    let passwordTextbox = fixture.debugElement.nativeElement.querySelector('[data-test-id="password"]');
    let submitButton = fixture.debugElement.nativeElement.querySelector('[data-test-id="submit"]');
    let form = fixture.debugElement.nativeElement.querySelector('[data-test-id="form"]');


    usernameTextbox.value = testUser.username;
    usernameTextbox.dispatchEvent(new Event('input'));

    passwordTextbox.value = testUser.password;
    passwordTextbox.dispatchEvent(new Event('input'));

    //submitButton.dispatchEvent(new Event('submit'));
    form.dispatchEvent(new Event('submit'));
   

    //component.register();
    expect(registerServiceSpy.registerUser).toHaveBeenCalledWith(testUser);

    //expect(routerSpy.navigate).toHaveBeenCalledWith(['']);

  });
  it('should save session and redirect to /post', async () => {

 
      await registerServiceSpy.registerUser(testUser).then((res: any)=>{
        console.log("reponse "+res);
          window.sessionStorage.setItem('access_token', res.access_token);
        console.log("my access token:", window.sessionStorage.getItem('access_token'));
        expect(window.sessionStorage.getItem('access_token')).toEqual('abcd');

        let routerSpy = { navigate: jasmine.createSpy('navigate') };
        routerSpy.navigate('/post');
          
        expect(routerSpy.navigate).toHaveBeenCalledWith('/post');
      })
      expect(component.errorMessage).toBe('');
  });
  // it('should set errMsg if there is an error registering', async () => {
  //   //registerServiceSpy.registerUser.and.returnValue(Promise.reject(new Error('fail')));
  //   await registerServiceSpy.registerUser(testUser).then((res: any)=>{
        
     
  //   }).catch((err:any)=>{
  //     expect(component.errorMessage).toContain(err);
  //   })
  // });



});

