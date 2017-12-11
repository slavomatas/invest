import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AuthRootComponent } from '../../auth-root/auth-root.component';
import { ActivationMsgComponent } from './activation-msg.component';
import { MockAuthenticationService } from '../../../../services/authentication/authentication.service';


const routes = [
    {
        path: 'auth/register/:token',
        component: AuthRootComponent
    }
];

@NgModule({
    declarations: [
        ActivationMsgComponent,
        AuthRootComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        ActivationMsgComponent
    ],
    providers: [
      {
        provide: MockAuthenticationService,
        useFactory: () => new MockAuthenticationService
      }
    ]
})

export class ActivationMsgModule {

}
