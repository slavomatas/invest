import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { IAuthService } from './i-auth-service';
import { Observable } from 'rxjs/Observable';

const GET_VERIFY_TOKEN_URL = '/auth/register/{token}';
@Injectable()
export class AuthService implements IAuthService {

  constructor(private httpClient: HttpClient) { }

  public async getRegisterVerificationResult(token: string): Promise<boolean> {

    let params: HttpParams = new HttpParams();
    params = params.set('token', token);

    let result: boolean;
    await this.httpClient
      .get<{ result: boolean}>(GET_VERIFY_TOKEN_URL, {
        params: params
      }).subscribe((httpResult) => {
        result = httpResult.result;
      });

    return result;
  }

}

export class MockAuthService implements IAuthService {
  getRegisterVerificationResult(token: string): Promise<boolean> {
    console.log('re you here?');
    return new Promise<boolean>((resolve) => {
      return setTimeout( () => {
        resolve(false);
    }, 1500);
    });
  }
}
