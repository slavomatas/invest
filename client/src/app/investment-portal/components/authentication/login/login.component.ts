import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { AuthenticationActions } from '../../../store/actions/authentication-actions';
import { User, CookieNames } from '../../../types/types';
import { Token } from '../../../types/authentication-types';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Component({
    selector: 'invest-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginFormErrors: any;

    private serverUrl = 'http://localhost:8085/socket';
    private stompClient;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private router: Router,
        private actions: AuthenticationActions,
        private authenticationService: AuthenticationService,
        private cookieService: CookieService
    ) {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.loginFormErrors = {
            email: {},
            password: {}
        };
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: []
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    public onLogin() {
        const password = this.loginForm.value.password;
        const email = this.loginForm.value.email;
        const rememberMe = this.loginForm.value.rememberMe;

        const ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        const that = this;
        this.stompClient.connect({}, function (frame) {
            that.stompClient.subscribe('/chat', (message) => {
                console.log(message.body);
            });
        });

        // Get access token
        this.authenticationService.login(email, password).then((loginData: Token) => {
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
        });
    }

}
