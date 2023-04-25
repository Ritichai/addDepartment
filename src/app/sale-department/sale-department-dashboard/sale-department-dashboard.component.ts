import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SaleDepartmentService } from 'src/app/services/sale-department.service';

@Component({
  selector: 'app-sale-department-dashboard',
  templateUrl: './sale-department-dashboard.component.html',
  styleUrls: ['./sale-department-dashboard.component.scss']
})
export class SaleDepartmentDashboardComponent {

  columsSaleDepartmentTable: string[] =
    ['sale_department_name', 'edit'];
  dataSourceOfSaleDepartmentTable = new MatTableDataSource<SaleDepartmentModel>();

  constructor(
     private router: Router,
     private saleDepartmentService: SaleDepartmentService
  ) {}
  ngOnInit(){
    this.dataSourceOfSaleDepartmentTable.data = [];
    this.saleDepartmentService.getSaleDepartment().subscribe(
      (data: any) => {
        this.dataSourceOfSaleDepartmentTable.data = data.body;
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }
  createNewSaleDepartment(){
    this.router.navigate(['sale-department/create-new-sale-department']);
  }
}


export interface SaleDepartmentModel {
  sale_department_name: string;
}
