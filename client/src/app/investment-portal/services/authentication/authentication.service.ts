import { Injectable } from '@angular/core';
import { IAuthenticationService } from './iauthentication.service';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { User} from '../../types/types';
import { RequestStatus, Token } from '../../types/authentication-types';
import { Md5 } from 'ts-md5/dist/md5';

const REGISTER_USER_URL = 'api/auth/register';
const LOGIN_USER_URL = 'api/oauth/token';
const GET_USER_URL = 'api/v1/user';
const GET_VERIFY_TOKEN_URL = 'api/auth/register';


@Injectable()
export class AuthenticationService implements IAuthenticationService {

  constructor(private http: HttpClient) { }

  /**
   *
   * @returns {Promise<User>}
   */
  public getUser(): Promise<User> {
    return this.http.get<User>(GET_USER_URL).toPromise();
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
    return this.http.post<Token>(LOGIN_USER_URL, body, {headers}).toPromise();
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
    return this.http.post<RequestStatus>(REGISTER_USER_URL, user, { params: user }).toPromise();
  }

  public async getRegisterVerificationResult(token: string): Promise<boolean> {
    const body = {};
    let result: boolean;
    await this.http
      .post<{ result: boolean }>(GET_VERIFY_TOKEN_URL + '/' + token, body).subscribe((httpResult) => {
        result = httpResult.result;
      });
    return result;
  }

}

