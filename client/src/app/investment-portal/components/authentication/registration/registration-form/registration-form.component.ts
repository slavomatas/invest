import { Component, OnInit } from '@angular/core';
import {FuseConfigService} from '../../../../../core/services/config.service';
import { fuseAnimations} from '../../../../../core/animations';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { passwordValidator } from './password-validation';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { RequestStatus } from '../../../../types/authentication-types';
import { Router } from '@angular/router';

@Component({
  selector: 'fuse-invest-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  animations: fuseAnimations,
})
export class RegistrationFormComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;
  staticAlertClosed = true;
  registrationMessage: string;
  alertType: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
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
      surname           : {},
      email          : {},
      password       : {},
      passwordConfirm: {}
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name           : ['', Validators.required],
      surname        : ['', Validators.required],
      email          : ['', [Validators.required, Validators.email]],
      password       : ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8), passwordValidator('password')]]
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
    });

  }

  onRegisterFormValuesChanged() {
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

  public onRegister() {
    let name = this.registerForm.value.name;
    let surname = this.registerForm.value.surname;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;

    console.log(name + " " + email + " " + password);

    this.authenticationService.register( name, surname, email, password).then((data: RequestStatus) => {
      console.log(data);
      this.staticAlertClosed = false;
      if (data.success) {

        setTimeout(function () {
          // Successful registration
          this.alertType = 'success';
          this.registrationMessage = ' Now you can log in.';
        }, 5000);
        this.router.navigate(['login']);
      }
      else {
        // Failed registration
        this.registrationMessage = data.msg;
        this.alertType = 'danger';
      }
    });
  }

}