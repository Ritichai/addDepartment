import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sale-dashboard',
  templateUrl: './sale-dashboard.component.html',
  styleUrls: ['./sale-dashboard.component.scss']
})
export class SaleDashboardComponent {

  dataSaleForeCastAll = [
    {
      id: 1,
      month: "12/2565",
      list_data: "แผนการขายล่วงหน้า คร้้งที่ 1",
      type_sale_co: 1,
      status: "วางแผนวัตถุดิบ",
      createAt: "",
      dueDate: "",
      approval_data: ""
    }, {
      id: 2,
      month: "11/2565",
      list_data: "",
      type_sale_co: 2,
      status: "อนุมัติสั่งซื้อวัตถุดิบ",
      createAt: "",
      dueDate: "",
      approval_data: ""
    }, {
      id: 3,
      month: "10/2565",
      list_data: "",
      type_sale_co: 3,
      status: "อนุมัติผลิต",
      createAt: "",
      dueDate: "",
      approval_data: ""
    }, {
      id: 4,
      month: "9/2565",
      list_data: "",
      type_sale_co: 1,
      status: "ผลิต",
      createAt: "",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 5,
      month: "8/2565",
      list_data: "",
      type_sale_co: 2,
      status: "เสร็จ",
      createAt: "",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 6,
      month: "7/2565",
      list_data: "แผนการขายล่วงหน้า คร้้งที่ 1",
      type_sale_co: 1,
      status: "เสร็จ",
      createAt: "1/1/65",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 7,
      month: "6/2565",
      list_data: "อนุมัติแผนการสั่งซื้อวัตถุดิบ",
      type_sale_co: 2,
      status: "เสร็จ",
      createAt: "2/2/65",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 8,
      month: "5/2565",
      list_data: "อนุมัติแผนการสั่งซื้อวัตถุดิบ",
      type_sale_co: 2,
      status: "เสร็จ",
      createAt: "2/2/65",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 9,
      month: "4/2565",
      list_data: "อนุมัติแผนการสั่งซื้อวัตถุดิบ",
      type_sale_co: 2,
      status: "เสร็จ",
      createAt: "2/2/65",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 10,
      month: "3/2565",
      list_data: "อนุมัติแผนการสั่งซื้อวัตถุดิบ",
      type_sale_co: 2,
      status: "เสร็จ",
      createAt: "2/2/65",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 11,
      month: "2/2565",
      list_data: "อนุมัติแผนการสั่งซื้อวัตถุดิบ",
      type_sale_co: 2,
      status: "เสร็จ",
      createAt: "2/2/65",
      dueDate: "",
      approval_data: ""
    },
    {
      id: 12,
      month: "1/2565",
      list_data: "อนุมัติแผนการสั่งซื้อวัตถุดิบ",
      type_sale_co: 2,
      status: "เสร็จ",
      createAt: "2/2/65",
      dueDate: "",
      approval_data: ""
    }
  ];
  dataSaleForeCastActive = [
    {
      id : 1,
      list_data: "แผนการขายล่วงหน้า คร้้งที่ 1",
      status: "1",
      createAt: "",
      dueDate: "",
    },
    {
      id : 2,
      list_data: "แผนการขายล่วงหน้า คร้้งที่ 2",
      status: "2",
      createAt: "",
      dueDate: "",
    },
    {
      id : 3,
      list_data: "แผนการขายล่วงหน้า เดือน 8 คร้้งที่ 3",
      status: "1",
      createAt: "",
      dueDate: "",
    }
  ];

  columnsSaleForeCastActiveTable: string[] = [
    "list_data",
    "status",
    "createAt",
    "dueDate",
    "view"
  ];

  columnsSaleForeCastAllTable: string[] = [
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



  dataSourceOfSaleForeCastActiveTable = new MatTableDataSource<saleForCastActiveModel>();
  dataSourceOfSaleForeCastAllTable = new MatTableDataSource<saleForeCastAllModel>();
  @ViewChildren(MatPaginator) paginator!: QueryList<MatPaginator>;
  @ViewChildren(MatSort) sort!: QueryList<MatSort>;
  //@ViewChild(MatPaginator, { static: true }) MatPaginator!: MatPaginator;
  //@ViewChild(MatSort, { static: true }) MatSort!: MatSort;
  // @ViewChild('SaleForeCastActivePaginator', { static: true }) SaleForeCastActivePaginator!: MatPaginator;
  // @ViewChild('SaleForeCastAllPaginator', { static: true }) SaleForeCastAllPaginator!: MatPaginator;
  // @ViewChild('SaleForeCastActiveSort', { static: true }) SaleForeCastActiveSort!: MatSort;
  // @ViewChild('SaleForeCastAllSort', { static: true }) SaleForeCastAllSort!: MatSort;


  constructor(
    private router: Router,
    private ActivatedRoute : ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.dataSourceOfSaleForeCastActiveTable.paginator = this.paginator.toArray()[0];;
    this.dataSourceOfSaleForeCastActiveTable.sort = this.sort.toArray()[0];
    this.dataSourceOfSaleForeCastActiveTable.data = [
      ...this.dataSaleForeCastActive
    ];

    this.dataSourceOfSaleForeCastAllTable.paginator = this.paginator.toArray()[1];
    this.dataSourceOfSaleForeCastAllTable.sort = this.sort.toArray()[1];
    this.dataSourceOfSaleForeCastAllTable.data = [
      ...this.dataSaleForeCastAll
    ]

    this.cd.detectChanges();
  }


  saleForCastActiveInfo(item: saleForCastActiveModel) {
    console.log(item);
    this.router.navigateByUrl('/sale/sale-forecast-info/' + item);
  }

}




export interface saleForeCastAllModel {
  id: number;
  month: string;
  list_data: string;
  type_sale_co: number;
  status: string;
  createAt: string;
  dueDate: string;
  approval_data: string;
}

export interface saleForCastActiveModel {
  id : number;
  list_data: string;
  status: string;
  createAt: string;
  dueDate: string;
}
