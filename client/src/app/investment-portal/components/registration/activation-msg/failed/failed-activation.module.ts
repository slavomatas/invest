import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import {FailedActivationComponent} from "./failed-activation.component";


const routes = [
    {
        path     : 'failed',
        component: FailedActivationComponent
    }
];

@NgModule({
    declarations: [
        FailedActivationComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
      FailedActivationComponent
    ]
})

export class FailedActivationModule {

}
