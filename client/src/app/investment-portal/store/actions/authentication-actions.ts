import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { NgRedux } from '@angular-redux/store';
import { User } from '../../types/types';
import { Token } from '../../types/authentication-types';
import { AppState } from '../store';

@Injectable()
export class AuthenticationActions {

  static GET_USER_SUCCESS = 'GET_USER_SUCCESS';
  static FGET_USER_FAILURE = 'FGET_USER_FAILURE';
  static GET_ACCESS_TOKEN_SUCCESS = 'GET_ACCESS_TOKEN_SUCCESS';
  static FGET_ACCESS_TOKEN_FAILURE = 'FGET_ACCESS_TOKEN_FAILURE';
  static LOG_OUT = 'LOG_OUT';


  constructor(private ngRedux: NgRedux<AppState>) { }


  public getUserDataFullfiled(success: boolean, data?: User) {
    this.ngRedux.dispatch({
      type: success ? AuthenticationActions.GET_USER_SUCCESS : AuthenticationActions.FGET_USER_FAILURE,
      payload: data != null ? data : undefined
    });
  }

  public getAccessTokenFullfiled(success: boolean, data?: Token) {
    this.ngRedux.dispatch({
      type: success ? AuthenticationActions.GET_ACCESS_TOKEN_SUCCESS : AuthenticationActions.FGET_ACCESS_TOKEN_FAILURE,
      payload: data != null ? data : undefined
    });
  }

  public logoutUser() {
    this.ngRedux.dispatch({
      type: AuthenticationActions.LOG_OUT,
      payload: undefined
    });
  }

}
