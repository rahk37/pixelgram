import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatMenuModule } from '@angular/material/menu'
import { NavbarComponent } from './navbar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';
import { PostComponent } from '../post/post.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        MatDialogModule,
        RouterTestingModule.withRoutes(
          [{path: 'login', component: LoginComponent},
          {path: 'post', component: PostComponent}]
        )
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]   
    }).compileComponents(); 
    window.sessionStorage  
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login if not authenticated', () => {
    let routerSpy = {navigate: jasmine.createSpy('navigate')};
    fixture.componentInstance.logButtonClicked();
    fixture.detectChanges();
    routerSpy.navigate('/login');
    expect(routerSpy.navigate).toHaveBeenCalledWith('/login');
  });

  it ('should redirect to post page if logo clicked', () => {
    let routerSpy = spyOn(component['router'], 'navigate');
    component.logoClicked();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should change navbar on login or register route', () => {
    spyOn(component['loginService'], 'isLoggedIn').and.returnValue(true);
    let routerSpy = spyOn(component['router'], 'navigate');
    component.logButtonClicked();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should logout user when logout button clicked if user is logged in', () => {
    let spy = spyOn(component['loginService'], 'isLoggedIn').and.returnValue(true);
    let routerSpy = spyOn(component['router'], 'navigate');
    component.logButtonClicked();
    expect(routerSpy).toHaveBeenCalled();
  });
});



