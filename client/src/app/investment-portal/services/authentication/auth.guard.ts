import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { User, CookieNames } from '../../types/types';
import { cloneDeep } from 'lodash';
import { AppState } from '../../store/store';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '../../types/authentication-types';
import { AuthenticationActions } from '../../store/actions/authentication-actions';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  userStore$ = this.ngRedux.select(state => state.user);
  user: User = null;
  constructor(private router: Router,
              private ngRedux: NgRedux<AppState>,
              private cookieService: CookieService,
              private authActions: AuthenticationActions,
              private authService: AuthenticationService) {
    // subscribe on token from redux Store
    this.userStore$.subscribe((data: User) => {
      if (data != null) {
        this.user = cloneDeep(data);
      }
    });
  }

  canActivate() {
    if (this.user != null) {
      // logged in so return true
      return true;
    }

    // check cookie token
    const cookieTokenString = this.cookieService.get(CookieNames.loginToken);

    if (cookieTokenString) {
      const token: Token = JSON.parse(cookieTokenString);

      // check token validity
      this.authService.isLoginTokenValid(token).then((isTokenValid: boolean) => {
        if (isTokenValid) {
          // save token into redux
          this.authActions.getAccessTokenFullfiled(true, token);
          // Get user details
          this.authService.getUser().then((userData: User) => {
          this.authActions.getUserDataFullfiled(true, userData);
            this.router.navigate(['dashboard']);
          });
        }
      });

    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
