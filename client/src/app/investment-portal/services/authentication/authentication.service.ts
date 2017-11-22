import { Injectable } from '@angular/core';
import {IAuthenticationService} from './iauthentication.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RequestStatus} from '../../types/types';

const REGISTER_USER_URL = '/auth/register';

@Injectable()
export class AuthenticationService implements IAuthenticationService{
  constructor(private http: HttpClient) { }

  /**
   *
   * @param {string} name
   * @param {string} surname
   * @param {string} email
   * @param {string} password
   * @returns {Promise<RequestStatus>}
   */
  public register(name: string, email: string, password: string): Promise<RequestStatus> {
    let params: HttpParams = new HttpParams();
    params = params.set('name', name);
    params = params.set('email', email);

    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(error, hash) {
        params = params.set('passwordHash', hash);
      });
    });

    return this.http.get<RequestStatus>(REGISTER_USER_URL, {
      params: params
    }).toPromise();
  }
}

export class MockAuthenticationService implements IAuthenticationService {
  public register(name: string, email: string, password: string): Promise<RequestStatus> {
    return new Promise<RequestStatus>((resolve) => {
        setTimeout(
          () => {
            resolve(
              {success: true}
            );
          },
          500);

      }
    );
  }

}
