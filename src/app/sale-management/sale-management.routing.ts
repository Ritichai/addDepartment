import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleManagementDashboardComponent } from './sale-management-dashboard/sale-management-dashboard.component';
import { AddDepartmentForSaleComponent } from './add-department-for-sale/add-department-for-sale.component';
import { EditDepartmentForSaleComponent } from './edit-department-for-sale/edit-department-for-sale.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/sale-management/dashboard',
    pathMatch:'full'
  },
  {
    path:'dashboard',
    component: SaleManagementDashboardComponent,
  },
  {
    path:'add-department-for-sale/:id',
    component:AddDepartmentForSaleComponent
  },
  {
    path:'edit-department-for-sale/:id',
    component:EditDepartmentForSaleComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleManagementRoutingModule { }
