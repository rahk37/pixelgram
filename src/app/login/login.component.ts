import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, User } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loading: boolean = false;
  user:User;
  isError:boolean;
  isUsernameError:boolean = false;
  isPasswordError:boolean = false;
  isIncorrect:boolean = false;
  visible:boolean = true;
  changeType:boolean = true;

  constructor(private loginService:LoginService, private router:Router) {
    this.user = {} as User;
    this.isError = false;
  }

  ngOnInit(): void {
    if(this.loginService.isLoggedIn()) this.router.navigate(['/post']);
  }

  loginUser() {
    this.isIncorrect = false;
    this.loading = true;
    this.checkUserInputError();
    
    if (this.user.username !== undefined && this.user.password !== undefined){
      let res =  Promise.resolve(this.loginService.authenticateUser(this.user));
      
      res.then((data) => {
       this.loading = false;

        window.sessionStorage.setItem('access_token', data.access_token);
        this.authenticateUser();
      })
      .catch((err) => {
        this.loading = false;

        this.isIncorrect = true;
      });
    } else {
      this.isIncorrect = true;
    }
  }

  isSecondError() {
    return this.isPasswordError || this.isIncorrect;
  }

  authenticateUser() {
    if (window.sessionStorage.getItem('access_token') !== null) {
      this.router.navigate(['/post']);
    }
  }
  
  checkUserInputError() {
    if(this.user.username === '' || this.user.username === undefined){
      this.isUsernameError = true;
    } else {
      this.isUsernameError = false;
    }
  
    if(this.user.password === '' || this.user.password === undefined){
      this.isPasswordError = true;
    } else {
      this.isPasswordError = false;
    }

    if(this.isPasswordError === true && this.isUsernameError === true){
      this.isIncorrect = true;
    }
  }

  showPassword() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  handleKeyUp(event:KeyboardEvent) {
    if (event.keyCode === 13) {
      this.loginUser();
    }
  }
}

