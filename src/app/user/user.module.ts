import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

import { UserRoutes } from './user.routing';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
  ]
})
export class UserModule { }
