import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleDepartmentRoutingModule } from './sale-department.routing';
import { SaleDepartmentDashboardComponent } from './sale-department-dashboard/sale-department-dashboard.component';
import { CreateNewSaleDepartmentComponent } from './create-new-sale-department/create-new-sale-department.component';
import { EditSaleDepartmentComponent } from './edit-sale-department/edit-sale-department.component';


@NgModule({
  declarations: [
    SaleDepartmentDashboardComponent,
    CreateNewSaleDepartmentComponent,
    EditSaleDepartmentComponent
  ],
  imports: [
    CommonModule,
    SaleDepartmentRoutingModule
  ]
})
export class SaleDepartmentModule { }
