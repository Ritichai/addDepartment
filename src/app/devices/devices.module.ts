import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices.routing';
import { DevicesDashboardComponent } from './devices-dashboard/devices-dashboard.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import { CreateNewDeviceFormComponent } from './create-new-device-form/create-new-device-form.component';
import {FormsModule} from "@angular/forms";
import { EditDeviceFormComponent } from './edit-device-form/edit-device-form.component';


@NgModule({
  declarations: [
    DevicesDashboardComponent,
    CreateNewDeviceFormComponent,
    EditDeviceFormComponent
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule
  ]
})
export class DevicesModule { }
