import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  const dummyRoute = {} as ActivatedRouteSnapshot;
  const fakeUrls = ['/', '/create-post'];
  let routerSpy: jasmine.SpyObj<Router>
  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [ AuthGuard,
        { provide: Router, useValue: routerSpy },
      ],
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(AuthGuard);
    
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  function fakeRouterState(url: string): RouterStateSnapshot { return { url, } as RouterStateSnapshot; }

  it('if logged in it show allow access to create post', () => {
    window.sessionStorage.setItem('access_token', 'abcd');
    const canActivate = guard.canActivate(dummyRoute, fakeRouterState(fakeUrls[1]));
    expect(canActivate).toBeTrue();
  });

  it('if not logged in it should NOT show allow access to create post', () => {
    window.sessionStorage.clear();

    const canActivate = guard.canActivate(dummyRoute, fakeRouterState(fakeUrls[1]));
    
    expect(canActivate).toBeFalse();
    //let routerSpy = { navigate: jasmine.createSpy('navigate') };
    //routerSpy.navigate('/login');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    
  });


});




