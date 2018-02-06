import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { AuthenticationActions } from '../../../store/actions/authentication-actions';
import { User } from '../../../types/types';
import { Token } from '../../../types/authentication-types';
import { Router } from '@angular/router';

@Component({
    selector   : 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    loginFormErrors: any;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private router: Router,
        private actions: AuthenticationActions,
        private authenticationService: AuthenticationService
    )

    {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.loginFormErrors = {
            email   : {},
            password: {}
        };
    }

    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLoginFormValuesChanged()
    {
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    public onLogin()
    {
      const password = this.loginForm.value.password;
      const email = this.loginForm.value.email;

      // Get access token
      this.authenticationService.login( email, password).then( (loginData: Token) => {
          this.actions.getAccessTokenFullfiled(true, loginData);
          // Get user details
          this.authenticationService.getUser().then((userData: User) => {
            this.actions.getUserDataFullfiled(true, userData);
            // Forward to dashboard page
            this.router.navigate(['dashboard']);
          });
      });
    }

}
