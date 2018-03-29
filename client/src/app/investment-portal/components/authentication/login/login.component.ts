import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { AuthenticationActions } from '../../../store/actions/authentication-actions';
import { User, CookieNames } from '../../../types/types';
import { Token } from '../../../types/authentication-types';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {MessageService} from '../../../services/websocket/message.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector   : 'invest-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations,
    providers: [MessageService]
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    loginFormErrors: any;
    formError: {
        active: Boolean;
        message: String;
    };

    messages: Array<string> = [];
    messageSub: Subscription;

    constructor(
        private messageService: MessageService,
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private router: Router,
        private actions: AuthenticationActions,
        private authenticationService: AuthenticationService,
        private cookieService: CookieService
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
            password: {},
        };

        this.formError = {
            active  : false,
            message : ''
        };
    }

    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: []
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });

      this.messageSub = this.messageService.messageReceived$.subscribe( message => this.messages.push(message));
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
        this.formError.active = false;
    }

    public onLogin()
    {
        const password = this.loginForm.value.password;
        const email = this.loginForm.value.email;
        const rememberMe = this.loginForm.value.rememberMe;
        this.formError.active = false;

        // Get access token
        const loginPromise: Promise<Token> = this.authenticationService.login(email, password);

        loginPromise.then((loginData: Token) => {
            this.actions.getAccessTokenFullfiled(true, loginData);
            // Get user details
            this.authenticationService.getUser().then((userData: User) => {
                this.actions.getUserDataFullfiled(true, userData);
                // store token into cookie
                if (rememberMe) {
                this.cookieService.set(CookieNames.loginToken, JSON.stringify(loginData));
                }
                // Forward to dashboard page
                this.router.navigate(['dashboard']);
            });
        })
        // Check for an error on request
        .catch((response: Response | any) => {
            if (response instanceof Response) {
                return Promise.reject(response);
            } else {
                switch (response.status){
                    case 400: // Bad request
                        this.formError.message = response.error.error_description != null ? response.error.error_description : 'Something went wrong!';
                        this.formError.active = true;
                        break;
                    case 504: // Bad gateway
                        this.formError.message = 'Failed to connect to server!';
                        this.formError.active = true;
                        break;
                    default:
                        this.formError.message = 'Something went wrong!';
                        this.formError.active = true;
                }
            }

            return Promise.resolve(response);
        });
    }
}
