import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale.routing';
import { SaleDashboardComponent } from './sale-dashboard/sale-dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { SaleListActiveInfoComponent } from './sale-list-active-info/sale-list-active-info.component';


@NgModule({
  declarations: [
    SaleDashboardComponent,
    SaleListActiveInfoComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class SaleModule { }
