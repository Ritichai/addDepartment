import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsDashboardComponent } from './products-dashboard/products-dashboard.component';
import { CreateNewProductFormComponent } from './create-new-product-form/create-new-product-form.component';
import { EditProductFormComponent } from './edit-product-form/edit-product-form.component';
import {MatTableModule} from "@angular/material/table";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProductsDashboardComponent,
    CreateNewProductFormComponent,
    EditProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatTableModule,
    MatSlideToggleModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class ProductsModule { }

export interface ProductsManagementModel {
  id: number;
  created_at: string;
  updated_at: string;
  category: string;
  group: string;
  product_code: string;
  trade_name: string;
  common_name: string;
  packing: string;
  size: number;
  pack_qty: string;
  product_unit: string;
  price: number;
  enabled: boolean;
}
