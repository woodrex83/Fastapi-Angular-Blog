import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { AuthLayoutRoutes } from './auth-layout-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AuthLayoutComponent } from './auth-layout.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MaterialModule,
  ],
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthLayoutModule { }
