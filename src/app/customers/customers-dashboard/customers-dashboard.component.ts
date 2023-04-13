import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {CustomerService} from '../../services/customers.service';
import * as moment from 'moment';
import {CustomerManagementModel} from "../customers.module";
import * as Papa from 'papaparse';

@Component({
  selector: 'app-customers-dashboard',
  templateUrl: './customers-dashboard.component.html',
  styleUrls: ['./customers-dashboard.component.scss'],
})
export class CustomersDashboardComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | undefined;

  columnsCustomerTable: string[] = [
    'customer_code',
    'customer_name',
    'customer_province',
    'customer_group',
    'enabled',
    'edit',
    'remove',
    'info',
  ];
  dataSourceOfCustomerTable = new MatTableDataSource<CustomerManagementModel>();
  selectedFile: File | undefined;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {
  }

  ngOnInit() {
    this.dataSourceOfCustomerTable.data = [];
    this.customerService.getCustomerList().subscribe(
      (data: any) => {
        this.dataSourceOfCustomerTable.data = data.body;
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      const fileReader = new FileReader();
      let parsedCsv: any[] = [];
      fileReader.readAsText(this.selectedFile);

      const isCustomerExist = (customerCode: string) => {
        return this.dataSourceOfCustomerTable.data.filter((item) => item.customer_code == customerCode).length > 0;
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

        const dataTable = parsedCsv.filter((item: any[], index) => item.length === 5 && index > 0);

        const tableHtml = `
        <table style="border-collapse: collapse; border: 1px solid black;">
          <thead>
            <tr style="background-color: grey; color: white; font-weight: bold;">
              <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">#</th>
              <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Customer Code</th>
              <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Customer Name</th>
              <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Customer Provice</th>
              <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Customer Group</th>
              <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Enabled</th>
              <th style="border: 1px solid black; padding-left: 10px; padding-right: 10px;">Type</th>
            </tr>
          </thead>
          <tbody>
            ${dataTable.map((row, index) => `
            <tr style="${isCustomerExist(row[0]) ? 'background-color: yellow;' : ''}">
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${index + 1}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[0]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[1]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[2]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${row[3]}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${getChipComponent(row[4])}</td>
              <td style="border: 1px solid black; padding-left: 10px; padding-right: 10px;"">${isCustomerExist(row[0]) ? 'Update' : 'New'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      `;

        const dataTableObject = dataTable.map((row) => {
          return {
            customer_code: row[0],
            customer_name: row[1],
            customer_province: row[2],
            customer_group: row[3],
            enabled: row[4]
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
            this.customerService.uploadBatchCustomer(dataTableObject).subscribe(
              (response: any) => {
                console.log(response);
                this.dataSourceOfCustomerTable.data = response.body;
                this.selectedFile = undefined;
                if(this.fileInput) {
                  this.fileInput.nativeElement.value = '';
                }
              },
              (err: any) => {
                console.log(err);
                this.selectedFile = undefined;
                if(this.fileInput) {
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

  gotoCreateNewCustomerPage() {
    console.log('gotoCreateNewCustomerPage');
    this.router.navigateByUrl('/customers/create-new-customer');
  }

  dateFormat(date: string) {
    return moment(date).format('DD/MM/YYYY');
  }

  gotoCustomerDetailPage(item: CustomerManagementModel) {
    console.log('gotoCustomerDetailPage', item);
// this.router.navigateByUrl('/customers/customer-detail/' + item.id);
  }

  gotoEditCustomerItem(customer_id: number) {
    this.router.navigateByUrl('/customers/edit-customer/' + customer_id);
  }

  deleteCustomerItem(item: CustomerManagementModel) {
    Swal.fire({
      title: 'ลบข้อมูลลูกค้า',
      text: 'คุณต้องการลบข้อมูลลูกค้า ' + item.customer_name + ' จริงหรือไม่ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(item.id).subscribe(
          (response: any) => {
// console.log(response);
          },
          (err: any) => {
            console.log('delete customer item fail', err);
          },
          () => {
            Swal.fire({
              title: 'การลบข้อมูลลูกค้า',
              text: 'ข้อมูลลูกค้า ' + item.customer_name + ' ถูกลบแล้ว',
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
