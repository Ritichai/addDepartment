import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleManagementRoutingModule } from './sale-management.routing';
import { SaleManagementDashboardComponent } from './sale-management-dashboard/sale-management-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddDepartmentForSaleComponent } from './add-department-for-sale/add-department-for-sale.component';
import { EditDepartmentForSaleComponent } from './edit-department-for-sale/edit-department-for-sale.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    SaleManagementDashboardComponent,
    AddDepartmentForSaleComponent,
    EditDepartmentForSaleComponent
  ],
  imports: [
    CommonModule,
    SaleManagementRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class SaleManagementModule { }
