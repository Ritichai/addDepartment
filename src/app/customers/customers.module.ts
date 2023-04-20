import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersDashboardComponent } from './customers-dashboard/customers-dashboard.component';
import { CreateNewCustomerFormComponent } from './create-new-customer-form/create-new-customer-form.component';
import { EditCustomerFormComponent } from './edit-customer-form/edit-customer-form.component';
import {MatTableModule} from "@angular/material/table";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CustomersDashboardComponent,
    CreateNewCustomerFormComponent,
    EditCustomerFormComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatTableModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class CustomersModule { }

export interface CustomerManagementModel {
  id: number;
  customer_code: string;
  customer_name: string;
  customer_province: string;
  customer_group: string;
  enabled: boolean;
}

export interface CustomerGroupModel {
  id: number;
  name: string;
}
