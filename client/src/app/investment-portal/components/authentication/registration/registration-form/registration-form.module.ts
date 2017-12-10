import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule} from '../../../../../core/modules/material.module';


import { RegistrationFormComponent} from './registration-form.component';
import {AuthenticationService, MockAuthenticationService} from '../../../../services/authentication/authentication.service';


const routes = [
  {
    path     : 'registration',
    component: RegistrationFormComponent
  }
];

@NgModule({
    declarations: [
      RegistrationFormComponent
    ],
    imports     : [
      SharedModule,
      RouterModule.forChild(routes),
      MaterialModule
    ],
    exports     : [
      RegistrationFormComponent
    ],
    providers   : [
      AuthenticationService,
      MockAuthenticationService
    ]
})

export class RegistrationFormModule {

}
