import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DialogConfirmLogoutComponent } from './dialog-confirm-logout/dialog-confirm-logout.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchbarService } from '../services/searchbar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentRoute = '';
  access_token;
  checkRouteSearch = false; //for hiding the search bar
  checkRouteLoginIcon = false; //for the login icon
  checkRouteAddPost = false; //for the login icon
  loading:boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private loginService: LoginService,
    private dialogMat: MatDialog,
    private searchbarService:SearchbarService
  ) {
    this.access_token = window.sessionStorage.getItem('access_token');;
  }

  ngOnInit(): void {

    this.router.events.subscribe((res) => {
      if (res instanceof NavigationStart) {
        //check to see if you should hide the search bar
        if (
          res.url === '/login' ||
          res.url === '/register' ||
          res.url === '/create-post'
        ) {
          this.checkRouteSearch = true;
        }
        else {
          this.checkRouteSearch = false;
        }
        //check to see if you should hide the login button
        if (res.url === '/login' || res.url === '/register') {
          this.checkRouteLoginIcon = true;
        } else {
          this.checkRouteLoginIcon = false;
        }

        //check to see if you should hide the add post button
        if (res.url === '/login' || res.url === '/register') {
          this.checkRouteAddPost = true;
        } else if (this.getLoginText() === 'Log In') {
          this.checkRouteAddPost = true;
        } else {
          this.checkRouteAddPost = false;
        }
      }
    });
    this.searchbarService.getLoading().subscribe((value)=>{
      this.loading = value;
    });
  }

  getLoginText(): string {
    return this.loginService.isLoggedIn() ? 'Log Out' : 'Log In';
  }

  logoClicked() {
    this.router.navigate(['/post']);
  }

  logButtonClicked() {

    if (this.loginService.isLoggedIn()) {
      this.loginService.deleteToken();
      this.checkRouteAddPost = true;
      this.router.navigate(['/post']);
      this.logoutDialogPopup();
      return;
    }

    this.router.navigate(['/login']);
  }

  logoutDialogPopup() {
    this.dialogMat.open(DialogConfirmLogoutComponent, {
      width: '250px',
    });
  }

  isLoggedIn(): boolean {
    return this.loginService.getUser();
  }
  
  // goToCreatePost() {
  //   this.router.navigate(['/create-post']);
  // }
}
