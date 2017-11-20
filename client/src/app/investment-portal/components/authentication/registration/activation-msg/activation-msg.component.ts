import { Component} from '@angular/core';
import { NgIf } from '@angular/common';

import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';

@Component({
    selector   : 'fuse-invest-activation-msg',
    templateUrl: './activation-msg.component.html',
    styleUrls  : ['./activation-msg.component.scss'],
    animations : fuseAnimations
})

export class ActivationMsgComponent {
    activated: boolean = true;

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
