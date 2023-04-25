import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserRoleManagementService } from '../../services/user-role-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-roles-dashboard',
  templateUrl: './user-roles-dashboard.component.html',
  styleUrls: ['./user-roles-dashboard.component.scss']
})
export class UserRolesDashboardComponent implements OnInit {

    /* These are variables for userroles table */
    columnsUserRolesTable: string[] = ['role_id','role_name','edit','remove','info'];
    dataSourceOfUserRolesTable = new MatTableDataSource<UserRolesModel>();
    @ViewChild(MatPaginator, {static: true}) MatPaginator!: MatPaginator;
    @ViewChild(MatSort, {static: true}) MatSort!: MatSort;

    constructor(
      private userRoleManagementService: UserRoleManagementService,
      private router: Router
    ) { }

    ngOnInit(): void {
      this.dataSourceOfUserRolesTable.paginator = this.MatPaginator;
      this.dataSourceOfUserRolesTable.sort = this.MatSort;
      this.dataSourceOfUserRolesTable.data = [];

      this.userRoleManagementService.getRoleList().subscribe((response :any) => {
        if(response['code'] == 200) {
      //    console.log('Success')
        } else {
     //     console.log('request fail');
        }
      }, (err) => {
   //     console.log('request error', err)
      }, () => {
   //     console.log("complete");
      })
    }

    /* Event when edit button was clicked. */
    editItem(item : UserRolesModel){
   //   console.log('The edit button was clicked.', item)
    }

    /* Event when delete button was clicked. */
    deleteAnItem(item: UserRolesModel){
   //   console.log('The delete button was clicked.', item)
    }

    /* Event when info button was clicked. */
    routeToItemInfo(item: UserRolesModel){
   //   console.log('The info button was clicked.', item)
    }

}
/* Interface class for UserRoles model */
export interface UserRolesModel {
  id: number;
  role_id: number;
  role_name: string;
}
