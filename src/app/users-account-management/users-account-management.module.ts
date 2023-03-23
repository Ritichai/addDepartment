import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersAccountDashboardComponent } from './users-account-dashboard/users-account-dashboard.component';

import { UsersAccountManagementRoutes } from './users-account-management.routing';
import { RouterModule } from '@angular/router';
import { CreateNewAccountFromComponent } from './create-new-account-from/create-new-account-from.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserAccountComponent } from './edit-user-account/edit-user-account.component';


@NgModule({
  declarations: [
    UsersAccountDashboardComponent,
    CreateNewAccountFromComponent,
    EditUserAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UsersAccountManagementRoutes),
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersAccountManagementModule { }
