import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleDepartmentDashboardComponent } from './sale-department-dashboard/sale-department-dashboard.component';
import { CreateNewSaleDepartmentComponent } from './create-new-sale-department/create-new-sale-department.component';
import { EditSaleDepartmentComponent } from './edit-sale-department/edit-sale-department.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/sale-department/dashboard',
    pathMatch:'full'
  },
  {
    path:'dashboard',
    component:SaleDepartmentDashboardComponent
  },
  {
    path:'create-new-sale-department',
    component:CreateNewSaleDepartmentComponent
  },
  {
    path:'edit-sale-department/:sale_department_id',
    component:EditSaleDepartmentComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleDepartmentRoutingModule { }
