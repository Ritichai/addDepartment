import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OpenSaleforecastComponent } from '../open-saleforecast/open-saleforecast.component'
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sale-co-dashboard',
  templateUrl: './sale-co-dashboard.component.html',
  styleUrls: ['./sale-co-dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SaleCoDashboardComponent {
  expandedElement: saleCoModel | null = null;
  data = [
    {
      id: 1,
      month: "12/2565",
      dataSaleForeCast: [
        {
          id: 1,
          list_data: "แผนการขายล่วงหน้า คร้้งที่ 1",
          type_sale_co: 1,
          status: "วางแผนวัตถุดิบ",
          createAt: "",
          dueDate: "",
          approval_data: ""
        },
        {
          id:3,
          list_data: "แผนการขายล่วงหน้า คร้้งที่ 2",
          type_sale_co: 1,
          status: "วางแผนวัตถุดิบ",
          createAt: "",
          dueDate: "",
          approval_data: ""
        }
      ],
    }, {
      id: 2,
      month: "11/2565",
      dataSaleForeCast: [
        {
          id: 2,
          list_data: "แผนการขายล่วงหน้า คร้้งที่ 1",
          type_sale_co: 2,
          status: "อนุมัติสั่งซื้อวัตถุดิบ",
          createAt: "",
          dueDate: "",
          approval_data: ""
        }
      ],
    },
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

    console.log(this.data);
    this.dataSourceOfSaleCoTable.data = this.data;

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
  dataSaleForeCast:object;
}

