import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import {ActivationMsgComponent} from './activation-msg.component';


const routes = [
    {
        path     : 'activation',
        component: ActivationMsgComponent
    }
];

@NgModule({
    declarations: [
      ActivationMsgComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
      ActivationMsgComponent
    ]
})

export class ActivationMsgModule {

}
