import { Injectable } from '@angular/core';
import {IAuthenticationService} from './iauthentication.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {RequestStatus, Token, User} from '../../types/types';
import {Md5} from 'ts-md5/dist/md5';

const DOMAIN = 'http://localhost:8085';
const REGISTER_USER_URL = DOMAIN + '/auth/register';
const LOGIN_USER_URL = 'http://testjwtclientid:XY7kmzoNzl100@localhost:8085/oauth/token';
const GET_USER_URL = DOMAIN + '/v1/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*'
  })
};


@Injectable()
export class AuthenticationService implements IAuthenticationService {

  constructor(private http: HttpClient) { }

  /**
   *
   * @param {string} token
   * @returns {Promise<User>}
   */
  public getUser(token: string): Promise<User> {
    console.log('GET_USER');
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token});

    return this.http.get<User>(GET_USER_URL, {headers}).toPromise();
  }

  /**
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Token>}
   */
  public login(email: string, password: string): Promise<Token> {
    let hash = Md5.hashStr(password).toLocaleString();
    const body = `username=${encodeURIComponent(email)}&password=${encodeURIComponent(hash)}&grant_type=password`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('testjwtclientid:XY7kmzoNzl100')});
    return this.http.post<Token>('http://localhost:8085/oauth/token', body, {headers}).toPromise();
  }


  /**
   *
   * @param {string} name
   * @param {string} surname
   * @param {string} email
   * @param {string} password
   * @returns {Promise<RequestStatus>}
   */
  public register(name: string, surname: string, email: string, password: string): Promise<RequestStatus> {
    let params: HttpParams = new HttpParams();

    let hash = Md5.hashStr(password).toLocaleString();
    const user = {
      'password': hash,
      'surname': surname,
      'name': name,
      'email': email
    };
    return this.http.post<RequestStatus>(REGISTER_USER_URL, user, {params: user}).toPromise();
  }

}

export class MockAuthenticationService implements IAuthenticationService {

  /**
   *
   * @param {string} token
   * @returns {Promise<User>}
   */
  getUser(token: string): Promise<User> {
    return new Promise<User>((resolve) => {
        setTimeout(
          () => {
            resolve(
              {
                name: 'Slavo Baca',
                username: 'example@email.com',
                email: 'example@email.com',
                role: {
                  name: 'STANDARD_USER',
                  description: 'STANDARD_USER'
                }
              }
            );
          },
          500);

      }
    );
  }

  /**
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Token>}
   */
  login(email: string, password: string): Promise<Token> {
    return new Promise<Token>((resolve) => {
        setTimeout(
          () => {
            resolve(
              { "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdGp3dHJlc291cmNlaWQiXSwiZXhwIjoxNTExOTU4MTk5LCJ1c2VyX25hbWUiOiJhQGIuY29tIiwianRpIjoiOGY2NTA2NGMtZGRmNy00NTJjLTlhZTctYzU5NjRiNGVhZGY4IiwiY2xpZW50X2lkIjoidGVzdGp3dGNsaWVudGlkIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.Qpi_RdaweHb5t3MNLpBJuHNLhwVVsTK3pxoja3WYqFQ",
                "token_type":"bearer",
                "expires_in":43199,
                "scope":"read write",
                "jti":"8f65064c-ddf7-452c-9ae7-c5964b4eadf8"
              }
            );
          },
          500);
      }
    );
  }

  /**
   *
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<RequestStatus>}
   */
  public register(name: string, surname: string, email: string, password: string): Promise<RequestStatus> {
    return new Promise<RequestStatus>((resolve) => {
        setTimeout(
          () => {
            resolve(
              {
                 success: true,
                 msg: null
              }
            );
          },
          500);

      }
    );
  }

}
