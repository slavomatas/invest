import { Component, Input, SimpleChanges } from '@angular/core';
import { NgIf } from '@angular/common';

import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
import {RequestStatus} from '../../../../types/authentication-types';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';

@Component({
  selector: 'invest-activation-msg',
  templateUrl: './activation-msg.component.html',
  styleUrls: ['./activation-msg.component.scss'],
  animations: fuseAnimations
})
export class ActivationMsgComponent {
  activationResult: boolean;

  constructor(private fuseConfig: FuseConfigService,
              private route: ActivatedRoute,
              private authService: AuthenticationService) {

    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar   : 'none',
        footer    : 'none'
      }
    });

    this.route.params.subscribe((res: {token: string}) => {
      this.authService.getRegisterVerificationResult(res.token).then((tokenVerified: RequestStatus) => {
        this.activationResult = tokenVerified.success;
      });
    });
  }
}
