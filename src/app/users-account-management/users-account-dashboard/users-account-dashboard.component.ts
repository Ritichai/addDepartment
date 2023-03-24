import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UsersService } from '../../services/user.service';

import swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-user-accounts-dashboard',
  templateUrl: './users-account-dashboard.component.html',
  styleUrls: ['./users-account-dashboard.component.scss']
})
export class UserAccountsDashboardComponent implements OnInit {
  columnsUserAccountsManagementTable: string[] = ['username', 'firstname', 'surname', 'employee_code', 'employee_position', 'user_role', 'reset_password', 'edit', 'remove', 'info'];
  dataSourceOfUserAccountsManagementTable = new MatTableDataSource<UserAccountsManagementModel>();
  @ViewChild(MatPaginator, {static: true}) MatPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) MatSort!: MatSort;

  constructor(
    private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.dataSourceOfUserAccountsManagementTable.paginator = this.MatPaginator;
    this.dataSourceOfUserAccountsManagementTable.sort = this.MatSort;
    this.dataSourceOfUserAccountsManagementTable.data = [];

    this.userService.getUsersAll().subscribe(response => {
      console.log(response);
      if(response['status'] == 200) {
        this.dataSourceOfUserAccountsManagementTable.data = JSON.parse(JSON.stringify(response.body)).map((m:any) => {
          m['firstname'] = m['titlename'] + m['firstname'];
          m['surname'] = m['lastname'];
          m['employee_code'] = m['employee_code'];
          m['user_role'] = m['role_id'];
          return m;
        })
        this.dataSourceOfUserAccountsManagementTable.paginator = this.MatPaginator;
        this.dataSourceOfUserAccountsManagementTable.sort = this.MatSort;
      }
    }, (err) => {
      console.log('get all user fail ', err);
    }, () => {
      console.log('get all user complete');
    })
  }

  gotoCreateNewAccountPage() {
    this.router.navigateByUrl('/users-account-management/create-new-account');
  }

  /* Event when edit button was clicked. */
  editItem(item: UserAccountsManagementModel) {
    this.router.navigateByUrl('/users-account-management/edit/' + item['id']);
  }
  resetPassword(item: UserAccountsManagementModel) {
    this.router.navigateByUrl('/users-account-management/reset-password/' + item['id']);
  }
  /* Event when delete button was clicked. */
  deleteAnItem(item: UserAccountsManagementModel) {
    swal.fire({
      title: 'ระงับบัญชีผู้ใช้',
      text: 'คุณต้องการลบ ' + item.username + ' จริงหรือไม่ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',

    }).then((result) => {
      if(result['value']) {
        this.userService.deleteUserAccount(item.id).subscribe((response) => {
          // console.log(response);
        }, (err) => {
          console.log('delete user account fail', err);
        }, () => {
          swal.fire({
            title: 'การลบบัญชี',
            text: 'บัญชี ' + item.username + ' ถูกระงับแล้ว',
            icon: 'success',
            confirmButtonAriaLabel: 'OK'
          }).then(() => {
            this.ngOnInit();
          })
        })
      }
    })


  }

  /* Event when info button was clicked. */
  routeToItemInfo(item: UserAccountsManagementModel) {
    console.log('The info button was clicked.', item)
  }




}

/* Interface class for UserAccountsManagement model */
export interface UserAccountsManagementModel {
  id: number;
  username: string;
  firstname: string;
  surname: string;
  employee_code: number;
  employee_position: string;
  user_role: string;
}
