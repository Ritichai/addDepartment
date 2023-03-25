import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRolesRoutes } from './user-roles.routing';

import { UserRolesDashboardComponent } from './user-roles-dashboard/user-roles-dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRolesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule
  ],
  declarations: [
    UserRolesDashboardComponent
  ]
})
export class UserRolesModule { }
