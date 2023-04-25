import { Component, ViewChild } from '@angular/core';
import { MatDialog , MatDialogRef  } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OpenSaleforecastComponent } from '../open-saleforecast/open-saleforecast.component'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SaleCoService } from 'src/app/services/saleco.service';

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

  columnsSalecoTableHeader = [
    "month",
    "status",
    "action",
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
    private saleCoService: SaleCoService
  ) { }
  ngOnInit(): void {
    this.dataSourceOfSaleCoTable.paginator = this.MatPaginator;
    this.dataSourceOfSaleCoTable.sort = this.MatSort;
    // console.log(this.data);
    // this.dataSourceOfSaleCoTable.data = this.data;
    this.saleCoService.getSaleCo().subscribe((res :any) => {
     // console.log(res);
      this.dataSourceOfSaleCoTable.data = res.body.data;
    });

  }

  viewdata(data:saleCoModel): void {
  //  console.log(data);
  }


  checkStatusSaleForecast(dataSaleForeCast: any[]): boolean {
    for (const data of dataSaleForeCast) {
      if (data.saleforecast_status === 0 || data.saleforecast_status === 1) {
        return true;
      }
    }
    return false;
  }

  checkDisableAddButton(dataSaleForeCast: any[]): boolean {
    for (const data of dataSaleForeCast) {
      if (data.saleforecast_status === 0 || data.saleforecast_status === 1) {
        return true;
      }
    }
    return false;
  }



  openDialog(data: saleCoModel): void {
    const dialogRef = this.dialog.open(OpenSaleforecastComponent, {
      data: {
        id: data.id,
        month: data.month,
        year: data.year,
      },
    });

    dialogRef.componentInstance.refreshEvent.subscribe(() => {
      this.ngOnInit();
    });
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

  formatDateTH(dateString: string): string {
    const thaiMonths = [
      'มกราคม',
      'กุมภาพันธ์',
      'มีนาคม',
      'เมษายน',
      'พฤษภาคม',
      'มิถุนายน',
      'กรกฎาคม',
      'สิงหาคม',
      'กันยายน',
      'ตุลาคม',
      'พฤศจิกายน',
      'ธันวาคม',
    ];

    const date = new Date(dateString);
    const year = date.getFullYear() + 543;
    const month = thaiMonths[date.getMonth()];
    const day = ('0' + date.getDate()).slice(-2);
    return `${day} ${month} ${year}`;
  }
}



export interface saleCoModel {
  id: number;
  month: string;
  year: string;
  dataSaleForeCast:object;
}

