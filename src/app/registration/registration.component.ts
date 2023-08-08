import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService, User } from '../services/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  user: User;
  errorMessage = '';
  changeType:boolean = true;
  hide = true;
  loading = false;


  constructor(private registrationService: RegisterService, private router: Router) {
    this.user = {} as User;
  }

  ngOnInit(): void {
    if(window.sessionStorage.getItem('access_token')!==null)
    {
      this.router.navigate(['/post']);
    }

  }

  handleKeyUp(event:KeyboardEvent) {
    if (event.keyCode === 13) {
      this.register();
    }
  }
  
  register() {
    this.loading = true;
    this.registrationService.registerUser(this.user).then((res) => {
      window.sessionStorage.setItem('access_token', res.access_token);
      if((window.sessionStorage.getItem('access_token')!=null) && (window.sessionStorage.getItem('access_token')!=undefined))
      {
        this.loading = false;
        this.router.navigate(['/post']);
      }
    })
      .catch(err => {
        this.loading = false;
        this.errorMessage = err;
      })

  }
}
