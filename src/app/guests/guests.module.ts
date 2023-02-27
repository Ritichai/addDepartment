import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

import { RouterModule } from '@angular/router';

import { GuestRoutes } from './guest.routing';

import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(GuestRoutes),
    FormsModule,
    MatTableModule
  ]
})
export class GuestsModule { }
