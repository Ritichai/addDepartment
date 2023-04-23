import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from '../../services/products.service';
import * as moment from 'moment';
import { ProductsManagementModel} from "../products.module";
import * as Papa from 'papaparse';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss'],
})
export class ProductsDashboardComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | undefined;

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
  dataSourceOfProductsTable = new MatTableDataSource<
    ProductsManagementModel
  >();
  selectedFile: File | undefined;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    // this.dataSourceOfProductsTable.paginator = this.paginator;
    // this.dataSourceOfProductsTable.sort = this.sort;
    this.dataSourceOfProductsTable.data = [];

    this.productsService.getProductsList().subscribe(
      (data: any) => {
        this.dataSourceOfProductsTable.data = data.body;
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      const fileReader = new FileReader();
      let parsedCsv: any[] = [];
      fileReader.readAsText(this.selectedFile);

      const isProductExist = (productCode: string) => {
        return this.dataSourceOfProductsTable.data.filter((item) => item.product_code == productCode).length > 0;
      }

      const getChipComponent = (value: string) => {
        return value == 'true' ?
          `<span style="background-color: green; color: white; padding-left: 5px; padding-right: 5px; border-radius: 10px; font-size: small">Enabled</span>` :
          `<span style="background-color: red; color: white; padding-left: 5px; padding-right: 5px; border-radius: 10px; font-size: small">Disabled</span>`;
      }

      fileReader.onload = (event: any) => {
        const csv = event.target.result;
        parsedCsv = Papa.parse(csv).data;
        console.log(parsedCsv);

        const dataTable = parsedCsv.filter((item: any[], index) => item.length === 11 && index > 0);

        const tableHtml = `
        <table style="border-collapse: collapse; border: 1px solid black;">
        <thead>
            <tr style="background-color: grey; color: white; font-weight: bold;">
                <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">#</th>
                <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Product Code</th>
                <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Category</th>
                <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Group</th>
                <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Trade Name</th>
                <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Common Name</th>
                <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Packing</th>
                <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Size</th>
                <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Pack Qty</th>
                <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Product Unit</th>
                <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Price</th>
                <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Enabled</th>
                <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Type</th>
            </tr>
        </thead>
        <tbody>
            ${dataTable.map((row, index) => `
            <tr style="${isProductExist(row[0]) ? 'background-color: yellow;' : ''}">
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${index + 1}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[0]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[1]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[2]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[3]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[4]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[5]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[6]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[7]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[8]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[9]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${getChipComponent(row[10])}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${isProductExist(row[0]) ? 'Update' : 'New'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      `;

        const dataTableObject = dataTable.map((row) => {
          return {
            product_code: row[0],
            category: row[1],
            group: row[2],
            trade_name: row[3],
            common_name: row[4],
            packing: row[5],
            size: row[6],
            pack_qty: row[7],
            product_unit: row[8],
            price: row[9],
            enabled: row[10]
          }
        });

        Swal.fire({
          title: 'Upload CSV',
          text: 'Do you want to upload this file?',
          html: tableHtml,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Upload',
          width: 'auto'
        }).then((result) => {
          if (result.isConfirmed) {
            this.productsService.uploadBatchProduct(dataTableObject).subscribe(
              (response: any) => {
                console.log(response);
                this.dataSourceOfProductsTable.data = response.body;
                this.selectedFile = undefined;
                if (this.fileInput) {
                  this.fileInput.nativeElement.value = '';
                }
              },
              (err: any) => {
                console.log(err);
                this.selectedFile = undefined;
                if (this.fileInput) {
                  this.fileInput.nativeElement.value = '';
                }
              }
            );
          }
        })
      };

      fileReader.onerror = (error) => {
        console.log(error);
      };
    }
  }
}
