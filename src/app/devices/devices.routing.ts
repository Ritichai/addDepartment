import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DevicesDashboardComponent} from "./devices-dashboard/devices-dashboard.component";
import {CreateNewDeviceFormComponent} from "./create-new-device-form/create-new-device-form.component";
import {EditDeviceFormComponent} from "./edit-device-form/edit-device-form.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/devices/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DevicesDashboardComponent,
  },
  {
    path: 'create-new-device',
    component: CreateNewDeviceFormComponent,
  },
  {
    path: 'edit-device/:device_id',
    component: EditDeviceFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
