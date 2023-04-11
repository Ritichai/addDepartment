import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadtimeProcessesDashboardComponent } from './leadtime-processes-dashboard/leadtime-processes-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/leadtime-processes/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: LeadtimeProcessesDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadtimeProcessesRouting { }
