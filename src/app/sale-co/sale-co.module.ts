import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleCoRoutingModule } from './sale-co.routing';
import { HolidaysRoutingModule } from '../holidays/holidays.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { SaleCoDashboardComponent } from './sale-co-dashboard/sale-co-dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OpenSaleforecastComponent } from './open-saleforecast/open-saleforecast.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    SaleCoDashboardComponent,
    OpenSaleforecastComponent
  ],
  imports: [
    CommonModule,
    SaleCoRoutingModule,
    CommonModule,
    HolidaysRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
export class SaleCoModule { }
