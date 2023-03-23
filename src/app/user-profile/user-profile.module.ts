import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile/my-profile.component';

import { MyProfileRoutes } from './user-profile.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MyProfileRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MyProfileComponent
  ]
})
export class UserProfileModule { }
