import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleDepartmentRoutingModule } from './sale-department.routing';
import { SaleDepartmentDashboardComponent } from './sale-department-dashboard/sale-department-dashboard.component';
import { CreateNewSaleDepartmentComponent } from './create-new-sale-department/create-new-sale-department.component';
import { EditSaleDepartmentComponent } from './edit-sale-department/edit-sale-department.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SaleDepartmentDashboardComponent,
    CreateNewSaleDepartmentComponent,
    EditSaleDepartmentComponent
  ],
  imports: [
    CommonModule,
    SaleDepartmentRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SaleDepartmentModule { }
