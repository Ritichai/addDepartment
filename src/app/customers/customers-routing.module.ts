import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersDashboardComponent} from "./customers-dashboard/customers-dashboard.component";
import {EditCustomerFormComponent} from "./edit-customer-form/edit-customer-form.component";
import {CreateNewCustomerFormComponent} from "./create-new-customer-form/create-new-customer-form.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/customers/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: CustomersDashboardComponent,
  },
  {
    path: 'create-new-customer',
    component: CreateNewCustomerFormComponent,
  },
  {
    path: 'edit-customer/:customer_id',
    component: EditCustomerFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
