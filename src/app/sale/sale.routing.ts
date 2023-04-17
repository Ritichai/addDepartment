import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleDashboardComponent } from './sale-dashboard/sale-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sale/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: SaleDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
