import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SaleCoService } from 'src/app/services/saleco.service';


@Component({
  selector: 'app-sale-dashboard',
  templateUrl: './sale-dashboard.component.html',
  styleUrls: ['./sale-dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SaleDashboardComponent {

  expandedElement: saleCoModel | null = null;
  // data = [
  //   {
  //     id: 1,
  //     month: "12/2565",
  //     dataSaleForeCast: [
  //       {
  //         id: 1,
  //         list_data: "แผนการขายล่วงหน้า คร้้งที่ 1",
  //         type_sale_co: 1,
  //         status: "วางแผนวัตถุดิบ",
  //         createAt: "",
  //         dueDate: "",
  //         approval_data: ""
  //       },
  //       {
  //         id: 3,
  //         list_data: "แผนการขายล่วงหน้า คร้้งที่ 2",
  //         type_sale_co: 1,
  //         status: "วางแผนวัตถุดิบ",
  //         createAt: "",
  //         dueDate: "",
  //         approval_data: ""
  //       }, {
  //         id: 3,
  //         list_data: "แผนการขายล่วงหน้า คร้้งที่ 3",
  //         type_sale_co: 1,
  //         status: "วางแผนวัตถุดิบ",
  //         createAt: "",
  //         dueDate: "",
  //         approval_data: ""
  //       }
  //     ],
  //   }, {
  //     id: 2,
  //     month: "11/2565",
  //     dataSaleForeCast: [
  //       {
  //         id: 2,
  //         list_data: "แผนการขายล่วงหน้า คร้้งที่ 1",
  //         type_sale_co: 2,
  //         status: "อนุมัติสั่งซื้อวัตถุดิบ",
  //         createAt: "",
  //         dueDate: "",
  //         approval_data: ""
  //       }
  //     ],
  //   },
  // ];
  columnsSalecoTableHeader = [
    "month",
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

  columnsSalecoActiveTable: string[] = [
    "list_data",
    "month",
    "status",
    "createAt",
    "dueDate",
    "view"
  ];

  // dataSaleForeCastActive = [
  //   {
  //     id: 1,
  //     list_data: "แผนการขายล่วงหน้า คร้้งที่ 1",
  //     status: "1",
  //     createAt: "2023/04/19",
  //     dueDate: "",
  //     customer: [
  //       {
  //         id: 1,
  //         customer_name: "บริษัท ลิ้มศักดากุลเคมีเกษตร จำกัด",
  //         productInCast: [
  //           {
  //             id: 1,
  //             product_id: 1,
  //             product_name: "สินค้า 1",
  //             strategy_grop: "skyrocket",
  //             product_grop: "Insecticide",
  //             pack_size: "1L",
  //             unit: 500,
  //             quantity_y: 1000,
  //             quantity_m: 1000,
  //           },
  //           {
  //             id: 2,
  //             product_id: 2,
  //             product_name: "สินค้า 2",
  //             strategy_grop: "skyrocket",
  //             product_grop: "Insecticide",
  //             pack_size: "1L",
  //             unit: 500,
  //             quantity_y: 1000,
  //             quantity_m: 1000,
  //           }
  //         ]
  //       },
  //       {
  //         id: 2,
  //         customer_name: "บริษัท ลิ้มศักดากุลเคมีเกษตร จำกัด",
  //         productInCast: [
  //           {
  //             id: 1,
  //             product_id: 1,
  //             product_name: "สินค้า 1",
  //             strategy_grop: "skyrocket",
  //             product_grop: "Insecticide",
  //             pack_size: "1L",
  //             unit: 500,
  //             quantity_y: 1000,
  //             quantity_m: 1000,
  //           },
  //           {
  //             id: 2,
  //             product_id: 2,
  //             product_name: "สินค้า 2",
  //             strategy_grop: "skyrocket",
  //             product_grop: "Insecticide",
  //             pack_size: "1L",
  //             unit: 500,
  //             quantity_y: 1000,
  //             quantity_m: 1000,
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     list_data: "แผนการขายล่วงหน้า คร้้งที่ 5",
  //     status: "2",
  //     createAt: "2023/06/19",
  //     dueDate: "",
  //     customer: [
  //       {
  //         id: 1,
  //         customer_name: "บริษัท ลิ้มศักดากุลเคมีเกษตร จำกัด",
  //         productInCast: [
  //           {
  //             id: 1,
  //             product_id: 1,
  //             product_name: "สินค้า 1",
  //             strategy_grop: "skyrocket",
  //             product_grop: "Insecticide",
  //             pack_size: "1L",
  //             unit: 500,
  //             quantity_y: 1000,
  //             quantity_m: 1000,
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  // columnsSaleForeCastActiveTable: string[] = [
  //   "list_data",
  //   "status",
  //   "createAt",
  //   "dueDate",
  //   "view"
  // ];




  dataSourceOfSaleForeCastActiveTable = new MatTableDataSource<saleCoModel>();
  dataSourceOfSaleCoTable = new MatTableDataSource<saleCoModel>();
  @ViewChildren(MatPaginator) paginator!: QueryList<MatPaginator>;
  @ViewChildren(MatSort) sort!: QueryList<MatSort>;


  constructor(
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private saleCoService: SaleCoService
  ) { }




  ngAfterViewInit(): void {
    this.dataSourceOfSaleForeCastActiveTable.paginator = this.paginator.toArray()[0];
    this.dataSourceOfSaleForeCastActiveTable.sort = this.sort.toArray()[0];
    this.saleCoService.getSaleCoByStatus().subscribe((res: any) => {
      console.log(res.body.data);
      this.dataSourceOfSaleForeCastActiveTable.data = res.body.data;
   });


    this.dataSourceOfSaleCoTable.paginator = this.paginator.toArray()[1];
    this.dataSourceOfSaleCoTable.sort = this.sort.toArray()[1];

    this.saleCoService.getSaleCo().subscribe((res: any) => {
      this.dataSourceOfSaleCoTable.data = res.body.data;
      console.log(res.body.data);
    });


    this.cd.detectChanges();
  }



  saleForCastActiveInfo(item: saleForCastActiveModel) {
    console.log(item);
    this.router.navigateByUrl('/sale/sale-forecast-info/' + item['id']);
  }

  getMonthName(createAt: string): string {
    const date = new Date(createAt);
    return new Intl.DateTimeFormat('th-TH', { month: 'long' }).format(date);
  }

  formatDate(dateString: string): string {
    const englishMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = englishMonths[date.getMonth()];
    //const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  }
}







export interface saleForCastActiveModel {
  id: number;
  list_data: string;
  status: string;
  createAt: string;
  dueDate: string;
  customer: object;
}

export interface saleCoModel {
  id: number;
  month: string;
  year: string;
  dataSaleForeCast: object;
}
