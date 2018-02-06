import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {NgRedux} from '@angular-redux/store';
import { cloneDeep } from 'lodash';
import {Token} from '../../types/authentication-types';
import { AppState } from '../../store/store';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  token$ = this.ngRedux.select(state => state.token);
  accessToken;

  constructor(private ngRedux: NgRedux<AppState>) {
    // subscribe on token from redux Store
    this.token$.subscribe((data: Token) => {
      if (data != null) {
        this.accessToken = cloneDeep(data.access_token);
      }
      else {
        this.accessToken = null;
      }
    });
  }

  /**
   *
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.accessToken != null) {
      // Create Authorization header
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.accessToken
      });

      // Clone the request to add the new header.
      const authReq = req.clone({headers: headers});

      // Send the newly created request
      return next.handle(authReq)
        .catch((error, caught) => {
          // intercept the response error and displace it to the console
          console.log(error);
          // return the error to the method that called it
          return Observable.throw(error);
        }) as any;
    }
    else {
      // Send original request if access token is undefined
      return next.handle(req);
    }
  }
}
