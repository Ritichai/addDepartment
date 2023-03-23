import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersAccountDashboardComponent } from './users-account-dashboard/users-account-dashboard.component';

import { UsersAccountManagementRoutes } from './users-account-management.routing';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UsersAccountDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UsersAccountManagementRoutes)
  ]
})
export class UsersAccountManagementModule { }
