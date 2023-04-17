import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale.routing';
import { SaleDashboardComponent } from './sale-dashboard/sale-dashboard.component';


@NgModule({
  declarations: [
    SaleDashboardComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule
  ]
})
export class SaleModule { }
