import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent],
  providers   : [
    AuthenticationService
  ]
})
export class AuthenticationModule { }
