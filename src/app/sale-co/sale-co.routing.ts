import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleCoDashboardComponent } from './sale-co-dashboard/sale-co-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/saleco/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: SaleCoDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleCoRoutingModule { }
