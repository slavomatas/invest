import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import {SuccessfulActivationComponent} from "./successful-activation.component";


const routes = [
    {
        path     : 'successful',
        component: SuccessfulActivationComponent
    }
];

@NgModule({
    declarations: [
        SuccessfulActivationComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
      SuccessfulActivationComponent
    ]
})

export class SuccessfulActivationModule
{

}
