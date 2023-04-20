import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleDashboardComponent } from './sale-dashboard/sale-dashboard.component';
import { SaleListActiveInfoComponent } from './sale-list-active-info/sale-list-active-info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sale/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: SaleDashboardComponent,
  },
  {
    path: 'sale-forecast-info/:id',
    component: SaleListActiveInfoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
