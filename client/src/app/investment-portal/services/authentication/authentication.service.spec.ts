import { TestBed, inject } from '@angular/core/testing';

import { MockAuthenticationService } from './authentication.service';
import { IAuthenticationService } from './iauthentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      {
        provide: MockAuthenticationService,
        useFactory: () =>  new MockAuthenticationService()
      }]
    });
  });

  it('should be created', inject([MockAuthenticationService], (service: IAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
