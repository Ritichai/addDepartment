import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsDashboardComponent} from "./products-dashboard/products-dashboard.component";
import {CreateNewProductFormComponent} from "./create-new-product-form/create-new-product-form.component";
import {EditProductFormComponent} from "./edit-product-form/edit-product-form.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: ProductsDashboardComponent,
  },
  {
    path: 'create-new-product',
    component: CreateNewProductFormComponent,
  },
  {
    path: 'edit-product/:product_id',
    component: EditProductFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
