import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {CustomerService} from '../../services/customers.service';
import * as moment from 'moment';
import {CustomerManagementModel} from "../customers.module";

@Component({
  selector: 'app-customers-dashboard',
  templateUrl: './customers-dashboard.component.html',
  styleUrls: ['./customers-dashboard.component.scss'],
})
export class CustomersDashboardComponent implements OnInit {
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
