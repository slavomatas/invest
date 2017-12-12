import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import {AuthenticationService } from '../../../services/authentication/authentication.service';

const routes = [
    {
        path     : 'login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers   : [
      AuthenticationService
    ]
})

export class LoginModule
{

}
