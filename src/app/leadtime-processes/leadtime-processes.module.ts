import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LeadtimeProcessesDashboardComponent } from './leadtime-processes-dashboard/leadtime-processes-dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadtimeProcessesRouting } from './leadtime-processes.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
  LeadtimeProcessesDashboardComponent
  ],
  imports: [
    CommonModule,
    LeadtimeProcessesRouting,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule

  ]
})
export class LeadtimeProcessesModule { }
