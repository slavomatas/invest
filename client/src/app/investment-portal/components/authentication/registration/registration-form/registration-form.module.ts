import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule} from '../../../../../core/modules/material.module';


import { RegistrationFormComponent} from './registration-form.component';


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
    ]
})

export class RegistrationFormModule {

}
