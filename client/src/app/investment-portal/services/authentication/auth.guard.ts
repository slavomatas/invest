import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { User } from '../../types/types';
import { cloneDeep } from 'lodash';
import { AppState } from '../../store/store';

@Injectable()
export class AuthGuard implements CanActivate {
  userStore$ = this.ngRedux.select(state => state.user);
  user: User = null;
  constructor(private router: Router,
              private ngRedux: NgRedux<AppState>) {
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

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
