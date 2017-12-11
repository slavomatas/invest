import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAuthService } from '../../services/auth/i-auth-service';
import { MockAuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  private token: string;
  private authSuccess: boolean | undefined;
  constructor(private route: ActivatedRoute, private authService: MockAuthService) {
    this.route.params.subscribe((res) => {
      console.log('subscribed ' + res.token);
      console.log(res);
      this.token = res.token
      this.authService.getRegisterVerificationResult(this.token).then((tokenVerified: boolean) => {
        console.log('result returned ' + tokenVerified);
        this.authSuccess = tokenVerified;
      });
    });
  }

  ngOnInit() {
  }

}
