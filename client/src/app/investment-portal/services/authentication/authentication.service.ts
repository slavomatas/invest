import { Injectable } from '@angular/core';
import { IAuthenticationService } from './iauthentication.service';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { User} from '../../types/types';
import { RequestStatus, Token } from '../../types/authentication-types';
import { Md5 } from 'ts-md5/dist/md5';
import { LoggingService } from '../logging/logging.service';

const REGISTER_USER_URL = 'api/auth/register';
const LOGIN_USER_URL = 'api/oauth/token';
const GET_USER_URL = 'api/v1/user';
const GET_VERIFY_TOKEN_URL = 'api/auth/register';


@Injectable()
export class AuthenticationService implements IAuthenticationService {

  constructor(
    private http: HttpClient,
    private loggingService: LoggingService
  ) { }

  /**
   *
   * @returns {Promise<User>}
   */
  public getUser(): Promise<User> {
    this.loggingService.captureRequest(GET_USER_URL);
    return this.http.get<User>(GET_USER_URL).toPromise();
  }

  /**
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Token>}
   */
  public login(email: string, password: string): Promise<Token> {
    const hash = Md5.hashStr(password).toLocaleString();
    const body = `username=${encodeURIComponent(email)}&password=${encodeURIComponent(hash)}&grant_type=password`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('testjwtclientid:XY7kmzoNzl100')});

    this.loggingService.captureRequestWithParams(LOGIN_USER_URL, body);
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
    const params: HttpParams = new HttpParams();

    const hash = Md5.hashStr(password).toLocaleString();
    const user = {
      'password': hash,
      'surname': surname,
      'name': name,
      'email': email
    };
    this.loggingService.captureRequestWithParams(REGISTER_USER_URL, JSON.stringify(user));
    return this.http.post<RequestStatus>(REGISTER_USER_URL, user, { params: user }).toPromise();
  }

  public getRegisterVerificationResult(token: string): Promise<RequestStatus> {
    const body = {};
    const requestUrl = GET_VERIFY_TOKEN_URL + '/' + token;
    this.loggingService.captureRequest(requestUrl);
    return this.http.post<RequestStatus>(GET_VERIFY_TOKEN_URL + '/' + token, body).toPromise();
  }

}

