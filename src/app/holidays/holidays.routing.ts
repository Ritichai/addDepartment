import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidaysDashboardComponent } from './holidays-dashboard/holidays-dashboard.component';
import { CreateNewHolidaysComponent } from './create-new-holidays/create-new-holidays.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/holidays/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: HolidaysDashboardComponent,
  },{
    path: 'createholiday',
    component: CreateNewHolidaysComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidaysRoutingModule { }
