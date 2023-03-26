import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

import { UserRoutes } from './user.routing';
import { RouterModule } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [
    UserDashboardComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    FormsModule
  ]
})
export class UserModule { }
