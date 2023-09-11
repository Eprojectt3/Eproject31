import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
})
export class FormModule {}
