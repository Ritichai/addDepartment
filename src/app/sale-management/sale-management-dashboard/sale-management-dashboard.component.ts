import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SaleManagementService } from 'src/app/services/sale-management.service';

@Component({
  selector: 'app-sale-management-dashboard',
  templateUrl: './sale-management-dashboard.component.html',
  styleUrls: ['./sale-management-dashboard.component.scss']
})
export class SaleManagementDashboardComponent {

  columnsSaleTable: string[] = [
    "sale_name",
    "role",
    "department",
    "add",
    "edit",
  ];
  dataSourceOfSaleTable = new MatTableDataSource<SaleModel>();
  @ViewChild(MatPaginator, { static: true }) MatPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) MatSort!: MatSort;

  constructor(
    private router: Router,
    private salemanagement : SaleManagementService,
  ) {}

  ngOnInit(): void {
    this.dataSourceOfSaleTable.paginator = this.MatPaginator;
    this.dataSourceOfSaleTable.sort = this.MatSort;
    this.dataSourceOfSaleTable.data = [];

    this.salemanagement.getUserRoleSaleList().subscribe((response: any) => {
      if (response['status'] == 201) {
        this.dataSourceOfSaleTable.data = JSON.parse(JSON.stringify(response.body.user_sale));
      }
      console.log(response['body'])
    });
  }

  addDepartmentForSale(id: number) {
    const encodedId = btoa(id.toString());
    this.router.navigate(['/sale-management/add-department-for-sale', encodedId]);
  }
  editDepartmentForSale(id:number){
    const encodedId = btoa(id.toString());
    this.router.navigate(['/sale-management/edit-department-for-sale', encodedId]);
  }
}



export interface SaleModel {
  id: number;
  firstname: string;
  lastname: string;
  role_id : number;
  department_id : number;
  sale_department_name: string;
}
