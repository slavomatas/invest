import { Component} from '@angular/core';

import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';

@Component({
    selector   : 'fuse-invest-failed-act',
    templateUrl: './failed-activation.component.html',
    styleUrls  : ['./failed-activation.component.scss'],
    animations : fuseAnimations
})

export class FailedActivationComponent
{

    constructor(
        private fuseConfig: FuseConfigService
    )
    {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });
    }
}
