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

  saleForceCastId: number | undefined;
  dataHeader = ''
  dataSaleForeCastActive = [
    {
      id: 1,
      list_data: "แผนการขายล่วงหน้า คร้้งที่ 1",
      status: "1",
      createAt: "2023/04/19",
      dueDate: "",
      customer: [
        {
          id: 1,
          customer_name: "บริษัท A1 จำกัด",
          productInCast: [
            {
              id: 1,
              product_id: 1,
              product_name: "สินค้า 1",
              strategy_grop: "skyrocket",
              product_grop: "Insecticide",
              pack_size: "1L",
              unit: 500,
              quantity_y: 1000,
              quantity_m: 1000,
            },
            {
              id: 2,
              product_id: 2,
              product_name: "สินค้า 2",
              strategy_grop: "skyrocket",
              product_grop: "Insecticide",
              pack_size: "1L",
              unit: 500,
              quantity_y: 1000,
              quantity_m: 1000,
            }
          ]
        },
        {
          id: 2,
          customer_name: "บริษัท B1 จำกัด",
          productInCast: [
            {
              id: 1,
              product_id: 1,
              product_name: "สินค้า 1",
              strategy_grop: "skyrocket",
              product_grop: "Insecticide",
              pack_size: "1L",
              unit: 500,
              quantity_y: 1000,
              quantity_m: 1000,
            },
            {
              id: 2,
              product_id: 2,
              product_name: "สินค้า 2",
              strategy_grop: "skyrocket",
              product_grop: "Insecticide",
              pack_size: "1L",
              unit: 500,
              quantity_y: 1000,
              quantity_m: 1000,
            }
          ]
        }
      ]
    },
    {
      id: 2,
      list_data: "แผนการขายล่วงหน้า คร้้งที่ 5",
      status: "2",
      createAt: "2023/06/19",
      dueDate: "",
      customer: [
        {
          id: 1,
          customer_name: "บริษัท A2 จำกัด",
          productInCast: [
            {
              id: 1,
              product_id: 1,
              product_name: "สินค้า 1",
              strategy_grop: "skyrocket",
              product_grop: "Insecticide",
              pack_size: "1L",
              unit: 500,
              quantity_y: 1000,
              quantity_m: 1000,
            }
          ]
        }
      ]
    }
  ];
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
    'strategy_group',
    'product_group',
    'pack_size',
    'unit',
    'quantity_m',
    'quantity_y',
    'total',
  ]

  dataSourceOfSaleForeCastTable = new MatTableDataSource<saleForCastActiveModel>();
  @ViewChildren(MatPaginator) paginator!: QueryList<MatPaginator>;
  @ViewChildren(MatSort) sort!: QueryList<MatSort>;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.saleForceCastId = params['id'];
      const filterData = this.dataSaleForeCastActive.filter((data) => data.id == this.saleForceCastId);
      const dataMap = filterData.map((data) => {
        this.dataHeader = data.list_data;
        return data
      });

      const dataMapCustomer = dataMap.flatMap((data) =>
        data.customer.flatMap((customer) =>
          customer.productInCast.map((product) => ({
            id: data.id,
            list_data: data.list_data,
            status: data.status,
            createAt: data.createAt,
            dueDate: data.dueDate,
            customer_name: customer.customer_name,
            product_name: product.product_name,
            strategy_group: product.strategy_grop,
            product_group: product.product_grop,
            pack_size: product.pack_size,
            unit: product.unit,
            quantity_m: product.quantity_m,
            quantity_y: product.quantity_y,
          }))
        )
      );

      console.log(dataMapCustomer);
      this.dataSourceOfSaleForeCastTable.data = dataMapCustomer;
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}

export interface saleForCastActiveModel {
  id: number;
  list_data: string;
  status: string;
  createAt: string;
  dueDate: string;
  customer_name: string;
  product_name: string;
  strategy_group: string;
  product_group: string;
  pack_size: string;
  unit: number;
  quantity_y: number;
  quantity_m: number;
}
