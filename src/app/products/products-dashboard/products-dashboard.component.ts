import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from '../../services/products.service';
import * as moment from 'moment';
import { ProductsManagementModel} from "../products.module";

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss'],
})
export class ProductsDashboardComponent implements OnInit {
  columnsProductsManagementTable: string[] = [
    'product_code',
    'trade_name',
    'common_name',
    'packing',
    'size',
    'pack_qty',
    'product_unit',
    'price',
    'edit',
    'remove',
    'info',
  ];
  dataSourceOfProductsManagementTable = new MatTableDataSource<
    ProductsManagementModel
  >();
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    // this.dataSourceOfProductsManagementTable.paginator = this.paginator;
    // this.dataSourceOfProductsManagementTable.sort = this.sort;
    this.dataSourceOfProductsManagementTable.data = [];

    this.productsService.getProductsList().subscribe(
      (data: any) => {
        this.dataSourceOfProductsManagementTable.data = data.body;
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }

  gotoCreateNewProductPage() {
    console.log('gotoCreateNewProductPage');
    this.router.navigateByUrl('/products/create-new-product');
  }

  dateFormat(date: string) {
    return moment(date).format('DD/MM/YYYY');
  }

  gotoProductDetailPage(item: ProductsManagementModel) {
    console.log('gotoProductDetailPage', item);
    // this.router.navigateByUrl('/products/product-detail/' + item.id);
  }

  gotoEditProductItem(product_id: number) {
    this.router.navigateByUrl('/products/edit-product/' + product_id);
  }

  deleteProductItem(item: ProductsManagementModel) {
    Swal.fire({
      title: 'ระงับสินค้า',
      text: 'คุณต้องการลบ ' + item.trade_name + ' จริงหรือไม่ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(item.id).subscribe(
          (response: any) => {
            // console.log(response);
          },
          (err: any) => {
            console.log('delete product item fail', err);
          },
          () => {
            Swal.fire({
              title: 'การลบสินค้า',
              text: 'สินค้า ' + item.trade_name + ' ถูกระงับแล้ว',
              icon: 'success',
              confirmButtonAriaLabel: 'OK',
            }).then(() => {
              this.ngOnInit();
            });
          }
        );
      }
    });
  }
}
