import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OpenSaleforecastComponent } from '../open-saleforecast/open-saleforecast.component'
@Component({
  selector: 'app-sale-co-dashboard',
  templateUrl: './sale-co-dashboard.component.html',
  styleUrls: ['./sale-co-dashboard.component.scss']
})
export class SaleCoDashboardComponent {

  dataSaleCo = [
    {
      id: 1,
      month: "12/2565",
      list_data: "แผนการขายล่วงหน้า คร้้งที่ 1",
      type_sale_co: 1,
      status: "วางแผนวัตถุดิบ",
      createAt: "",
      dueDate: "",
      approval_data: ""
    },{
      id: 2,
      month: "11/2565",
      list_data: "",
      type_sale_co: 2,
      status: "อนุมัติสั่งซื้อวัตถุดิบ",
      createAt: "",
      dueDate: "",
      approval_data: ""
    },{
      id: 3,
      month: "10/2565",
      list_data: "",
      type_sale_co:3,
      status: "อนุมัติผลิต",
      createAt: "",
      dueDate: "",
      approval_data: ""
    },{
      id: 4,
      month: "9/2565",
      list_data: "",
      type_sale_co:1,
      status: "ผลิต",
      createAt: "",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 5,
      month: "8/2565",
      list_data: "",
      type_sale_co:2,
      status: "เสร็จ",
      createAt: "",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 6,
      month: "7/2565",
      list_data: "แผนการขายล่วงหน้า คร้้งที่ 1",
      type_sale_co:1,
      status: "เสร็จ",
      createAt: "1/1/65",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 7,
      month: "6/2565",
      list_data: "อนุมัติแผนการสั่งซื้อวัตถุดิบ",
      type_sale_co:2,
      status: "เสร็จ",
      createAt: "2/2/65",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 8,
      month: "5/2565",
      list_data: "อนุมัติแผนการสั่งซื้อวัตถุดิบ",
      type_sale_co:2,
      status: "เสร็จ",
      createAt: "2/2/65",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 9,
      month: "4/2565",
      list_data: "อนุมัติแผนการสั่งซื้อวัตถุดิบ",
      type_sale_co:2,
      status: "เสร็จ",
      createAt: "2/2/65",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 10,
      month: "3/2565",
      list_data: "อนุมัติแผนการสั่งซื้อวัตถุดิบ",
      type_sale_co:2,
      status: "เสร็จ",
      createAt: "2/2/65",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 11,
      month: "2/2565",
      list_data: "อนุมัติแผนการสั่งซื้อวัตถุดิบ",
      type_sale_co:2,
      status: "เสร็จ",
      createAt: "2/2/65",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 12,
      month: "1/2565",
      list_data: "อนุมัติแผนการสั่งซื้อวัตถุดิบ",
      type_sale_co:2,
      status: "เสร็จ",
      createAt: "2/2/65",
      dueDate: "",
      approval_data: ""
    }
  ];
  columnsSalecoTable: string[] = [
    "month",
    "list_data",
    "type_sale_co",
    "status",
    "createAt",
    "dueDate",
    "approval_data",
    "action",
    "view"
  ];
  dataSourceOfSaleCoTable = new MatTableDataSource<saleCoModel>();
  //columnsToDisplayWithExpand = [...this.columnsHolidayTable, 'expand'];
  @ViewChild(MatPaginator, { static: true }) MatPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) MatSort!: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.dataSourceOfSaleCoTable.paginator = this.MatPaginator;
    this.dataSourceOfSaleCoTable.sort = this.MatSort;
    this.dataSourceOfSaleCoTable.data = [
      ...this.dataSaleCo
    ];

  }

  openDialog(data:saleCoModel): void {
    this.dialog.open(OpenSaleforecastComponent,{
      data:{
        id: data.id,
        month: data.month,
      }
    });
  }
}
export interface saleCoModel {
  id: number;
  month: string;
  list_data: string;
  type_sale_co: number;
  status: string;
  createAt: string;
  dueDate: string;
  approval_data: string;
}

