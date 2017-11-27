import { Component, OnInit } from '@angular/core';
import {FuseConfigService} from '../../../../../core/services/config.service';
import { fuseAnimations} from '../../../../../core/animations';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { passwordValidator} from './password-validation';

@Component({
  selector: 'fuse-invest-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  animations: fuseAnimations,
})
export class RegistrationFormComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;

  constructor(
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder
  )
  {
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar   : 'none',
        footer    : 'none'
      }
    });

    this.registerFormErrors = {
      name           : {},
      email          : {},
      password       : {},
      passwordConfirm: {}
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name           : ['', Validators.required],
      email          : ['', [Validators.required, Validators.email]],
      password       : ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8), passwordValidator('password')]]
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
    });
  }

  onRegisterFormValuesChanged()
  {
    for ( const field in this.registerFormErrors )
    {
      if ( !this.registerFormErrors.hasOwnProperty(field) )
      {
        continue;
      }

      // Clear previous errors
      this.registerFormErrors[field] = {};

      // Get the control
      const control = this.registerForm.get(field);

      if ( control && control.dirty && !control.valid )
      {
        this.registerFormErrors[field] = control.errors;
      }
    }
  }

}
