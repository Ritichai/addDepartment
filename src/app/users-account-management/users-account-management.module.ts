import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountsDashboardComponent } from './users-account-dashboard/users-account-dashboard.component';
import { UsersAccountManagementRoutes } from './users-account-management.routing';
import { RouterModule } from '@angular/router';
import { CreateNewAccountFromComponent } from './create-new-account-from/create-new-account-from.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserAccountComponent } from './edit-user-account/edit-user-account.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ViewUserInfoComponent } from './view-user-info/view-user-info.component';

@NgModule({
  declarations: [
    UserAccountsDashboardComponent,
    CreateNewAccountFromComponent,
    EditUserAccountComponent,
    ResetPasswordComponent,
    ViewUserInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UsersAccountManagementRoutes),
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
})
export class UsersAccountManagementModule {}
