import { Component} from '@angular/core';

import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';

@Component({
  selector   : 'fuse-invest-successful-act',
  templateUrl: './successful-activation.component.html',
  styleUrls  : ['./successful-activation.component.scss'],
  animations : fuseAnimations
})

export class SuccessfulActivationComponent
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
