import {inject, TestBed} from '@angular/core/testing';
import { IAuthenticationService } from './iauthentication.service';
import { User } from '../../types/types';
import { RequestStatus, Token } from '../../types/authentication-types';

const RESPONSE_TIMEOUT = 500;

describe('DashboardSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MockAuthenticationService,
          useFactory: () =>  new MockAuthenticationService()
        }
      ]
    });
  });

});

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
                'name': 'Martina', 'email': 'halajovamartina@gmail.com',
                'surname': 'Halajova',
                'username': 'halajovamartina@gmail.com',
                'roles': [
                  {
                    'roleName': 'STANDARD_USER',
                    'description': null
                  }]
              }
            );
          },
          RESPONSE_TIMEOUT);
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
              { 'access_token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdGp3dHJlc291cmNlaWQiXSwiZXhwIjoxNTExOTU4MTk5LCJ1c2VyX25hbWUiOiJhQGIuY29tIiwianRpIjoiOGY2NTA2NGMtZGRmNy00NTJjLTlhZTctYzU5NjRiNGVhZGY4IiwiY2xpZW50X2lkIjoidGVzdGp3dGNsaWVudGlkIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.Qpi_RdaweHb5t3MNLpBJuHNLhwVVsTK3pxoja3WYqFQ',
                'token_type' : 'bearer',
                'expires_in' : 43199,
                'scope' : 'read write',
                'jti' : '8f65064c-ddf7-452c-9ae7-c5964b4eadf8'
              }
            );
          },
          RESPONSE_TIMEOUT);
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
          RESPONSE_TIMEOUT);

      }
    );
  }

  getRegisterVerificationResult(token: string): Promise<RequestStatus> {
    return new Promise<RequestStatus>((resolve) => {
      return setTimeout(() => {
        resolve({ success: true, msg: null});
      }, RESPONSE_TIMEOUT * 3);
    });
  }

}

