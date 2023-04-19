import {
  Component,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-sale-list-active-info',
  templateUrl: './sale-list-active-info.component.html',
  styleUrls: ['./sale-list-active-info.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SaleListActiveInfoComponent {
  //data



  dataSaleListActiveInfo = [
    {
      id: 1,
      sale_forcast_order: 1,
      grop: 1,
      customer: [
        {
          id: 1,
          customer_name: 'บริษัท ไทยเอฟเอ็ม1 จำกัด',
          customer_code: 'THFM1',
          customer_products: [
            {
              id: 1,
              product_name: 'สินค้า 1',
              product_code: 'P001',
              product_qty: 100,
            },
          ],
        },
        {
          id: 2,
          customer_name: 'บริษัท ไทยเอฟเอ็ม2 จำกัด',
          customer_code: 'THFM2',
          customer_products: [
            {
              id: 1,
              product_name: 'สินค้า 2',
              product_code: 'P002',
              product_qty: 3,
            },
            {
              id: 2,
              product_name: 'สินค้า 3',
              product_code: 'P003',
              product_qty: 5,
            },
            {
              id: 3,
              product_name: 'สินค้า 4',
              product_code: 'P004',
              product_qty: 10,
            },
          ],
        },
      ],
    },
  ];
  dataSaleInfo: saleInfoModel[] = [];
  dataStrategyGroup: strategyGroupModel[] = [
    {
      id: 1,
      strategy_group_name: 'Skyrocket',
      strategy_group_goal: 5000,
      strategy_group_forecast: 10000,
    },
    {
      id: 2,
      strategy_group_name: 'Natural',
      strategy_group_goal: 4000,
      strategy_group_forecast: 4000,
    },
    {
      id: 3,
      strategy_group_name: 'Expand',
      strategy_group_goal: 600,
      strategy_group_forecast: 5000,
    },
    {
      id: 4,
      strategy_group_name: 'Orther',
      strategy_group_goal: 500,
      strategy_group_forecast: 2000,
    },
  ];
  dataProductPoppular: productPoppularModel[] = [

        {
          id: 1,
          product_name: 'สินค้า 1',
          monthly_sales: {
            product_top_sale_m7: 100,
            product_top_sale_m8: 200,
            product_top_sale_m9: 300,
          },
          totle_sales: 600,
        },
        {
          id: 2,
          product_name: 'สินค้า 2',
          monthly_sales: {
            product_top_sale_m7: 100,
            product_top_sale_m8: 200,
            product_top_sale_m9: 300,
          },
          totle_sales: 600,
        }


  ];
  dataSaleForCastOrder: saleForcastOrderModel[] = [
    {
      id: 1,
      customer_name: 'ลูกค้า A',
      product: [
        {
          id: 1,
          product_name: 'สินค้า 1',
          product_strategy: 'กลุ่มสินค้า A',
          product_group: 'สินค้าชนิด 1',
          product_size: 'S',
          product_price: 100,
          product_unit: 'ชิ้น',
          product_quantity_year: 1200,
          product_quantity_month: 100,
          product_total: 120000,
        },
        {
          id: 2,
          product_name: 'สินค้า 2',
          product_strategy: 'กลุ่มสินค้า A',
          product_group: 'สินค้าชนิด 2',
          product_size: 'M',
          product_price: 150,
          product_unit: 'ชิ้น',
          product_quantity_year: 1000,
          product_quantity_month: 80,
          product_total: 150000,
        },
        {
          id: 3,
          product_name: 'สินค้า 3',
          product_strategy: 'กลุ่มสินค้า B',
          product_group: 'สินค้าชนิด 3',
          product_size: 'L',
          product_price: 200,
          product_unit: 'ชิ้น',
          product_quantity_year: 800,
          product_quantity_month: 70,
          product_total: 160000,
        },
      ],
    },
  ];
  columnsSaleInfo: string[] = ['sale_name', 'sale_grop', 'sale_department'];


  //colums
  columnsSaleForcastOrder: string[] = [
    'customer_name',
    'product_name',
    'product_strategy',
    'product_grop',
    'product_size',
    'product_price',
    'product_unit',
    'product_quantity_year',
    'product_quantity_month',
    'product_totle',
  ]

  columnsStrategyGroup: string[] = [
    'strategy_group_name',
    'strategy_group_goal',
    'strategy_group_forecast',
  ];
  columnsProductPoppular: string[] = [
    'product_name',
    'product_top_sale_m7',
    'product_top_sale_m8',
    'product_top_sale_m9',
    'totle_sales',
  ];




  dataSourceOfSaleInfoTable = new MatTableDataSource<saleInfoModel>();
  dataSourceOfStrategyGroupTable = new MatTableDataSource<strategyGroupModel>();
  dataSourceOfSaleForcastOrderTable = new MatTableDataSource<saleForcastOrderModel>();
  dataSourceOfProductPoppularTable =new MatTableDataSource<productPoppularModel>();
  @ViewChildren(MatPaginator) paginator!: QueryList<MatPaginator>;
  @ViewChildren(MatSort) sort!: QueryList<MatSort>;

  constructor(private router: Router, private cd: ChangeDetectorRef) {}


  ngAfterViewInit() {
    this.dataSourceOfSaleInfoTable.paginator = this.paginator.toArray()[0];
    this.dataSourceOfSaleInfoTable.sort = this.sort.toArray()[0];
    this.dataSourceOfSaleInfoTable.data = [...this.dataSaleInfo];

    this.dataSourceOfStrategyGroupTable.paginator = this.paginator.toArray()[1];
    this.dataSourceOfStrategyGroupTable.sort = this.sort.toArray()[1];
    this.dataSourceOfStrategyGroupTable.data = [...this.dataStrategyGroup];

    this.dataSourceOfProductPoppularTable.paginator = this.paginator.toArray()[2];
    this.dataSourceOfProductPoppularTable.sort = this.sort.toArray()[2];
    this.dataSourceOfProductPoppularTable.data = [...this.dataProductPoppular];

    this.dataSourceOfSaleForcastOrderTable.paginator = this.paginator.toArray()[3];
    this.dataSourceOfSaleForcastOrderTable.sort = this.sort.toArray()[3];
    this.dataSourceOfSaleForcastOrderTable.data = [...this.dataSaleForCastOrder];

    this.cd.detectChanges();
  }



}
export interface saleInfoModel {
  id: number;
  sale_name: string;
  sale_grop: string;
  sale_department: string;
}

export interface strategyGroupModel {
  id: number;
  strategy_group_name: string;
  strategy_group_goal: number;
  strategy_group_forecast: number;
}

export interface productPoppularModel {
  id: number;
  product_name: string;
  monthly_sales: {
    product_top_sale_m7: number;
    product_top_sale_m8: number;
    product_top_sale_m9: number;
  };
  totle_sales: number;
}



export interface saleForcastOrderModel {
  id: number;
  customer_name: string;
  product: ProductModel[];
}

export interface ProductModel {
  id: number;
  product_name: string;
  product_strategy: string;
  product_group: string;
  product_size: string;
  product_price: number;
  product_unit: string;
  product_quantity_year: number;
  product_quantity_month: number;
  product_total: number;
}

export interface TableElement {
  saleForcastOrder: saleForcastOrderModel | null;
  product: ProductModel | null;
}
