import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockAuthenticationService } from '../../../services/authentication/authentication.service.spec';

@Component({
  selector: 'fuse-invest-auth-root',
  templateUrl: './auth-root.component.html',
  styleUrls: ['./auth-root.component.scss']
})
export class AuthRootComponent implements OnInit {
  private token: string;
  private authSuccess: boolean | undefined;
  constructor(private route: ActivatedRoute, private authService: MockAuthenticationService) {
    this.route.params.subscribe((res) => {
      this.token = res.token;
      this.authService.getRegisterVerificationResult(this.token).then((tokenVerified: boolean) => {
        this.authSuccess = tokenVerified;
      });
    });
  }

  ngOnInit() {
  }

}
