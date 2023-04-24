import { UsersService } from 'src/app/services/user.service';
import {
  Component,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SaleCoService } from 'src/app/services/saleco.service';

@Component({
  selector: 'app-sale-list-active-info',
  templateUrl: './sale-list-active-info.component.html',
  styleUrls: ['./sale-list-active-info.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SaleListActiveInfoComponent {
  //data

  infoID: number | undefined;
  dataHeader = ''
  departmentId = 0;
  columnsInfo = [
    'sale_name',
    'sale_grop',
    'sale_department',
  ]
  columnsMonthlySalesTarget = [
    'strategy_group',
    'target',
    'forecast',
  ]
  columnsPoppularProductInMonthly = [
    'add_now',
    'product_name',
    'monthly_7',
    'monthly_8',
    'monthly_9',
    'all_month',
  ]
  columnsSaleForeCast = [
    'customer_name',
    'product_name',

  ]



  dataUsers: any[] = []


  dataSourceOfSaleForeCastTable = new MatTableDataSource<saleForCast>();
  dataInfo = new MatTableDataSource<infoModel>();
  @ViewChildren(MatPaginator) paginator!: QueryList<MatPaginator>;
  @ViewChildren(MatSort) sort!: QueryList<MatSort>;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private saleCoService: SaleCoService,
  ) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.infoID = params['id'];
      this.userService.getMyUserinfo().subscribe((response: any) => {
        const data = response.data;
        this.dataUsers.push(data);
        this.dataInfo.paginator = this.paginator.toArray()[0];
        this.dataInfo.sort = this.sort.toArray()[0];
        this.dataInfo.data = this.dataUsers;



      });
    });
  }



  ngAfterViewInit() {
    this.dataSourceOfSaleForeCastTable.paginator = this.paginator.toArray()[1];
    this.dataSourceOfSaleForeCastTable.sort = this.sort.toArray()[1];
    this.cd.detectChanges();
  }
}


export interface saleForCast {
  customer_name: string;
  product_name: string;

}
// export interface saleForCastActiveModel {
//   id: number;
//   list_data: string;
//   status: string;
//   createAt: string;
//   dueDate: string;
//   customer_name: string;
//   product_name: string;
//   strategy_group: string;
//   product_group: string;
//   pack_size: string;
//   unit: number;
//   quantity_y: number;
//   quantity_m: number;
// }
export interface infoModel {
  sale_name: string;
  sale_grop: string;
  sale_department: string;
}
