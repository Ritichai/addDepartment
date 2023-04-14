import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HolidaysService } from 'src/app/services/holidays.service';
//import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-holidays-dashboard',
  templateUrl: './holidays-dashboard.component.html',
  styleUrls: ['./holidays-dashboard.component.scss'],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({height: '0px', minHeight: '0'})),
  //     state('expanded', style({height: '*'})),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ],
})
export class HolidaysDashboardComponent {

  columnsHolidayTable: string[] = [
    "holiday_year",
    "holiday_date",
    "holiday_name",
  ];
  //expandedData!: Holiday | null;
  dataSourceOfHolidayTable = new MatTableDataSource<Holiday>();
  //columnsToDisplayWithExpand = [...this.columnsHolidayTable, 'expand'];
  @ViewChild(MatPaginator, { static: true }) MatPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) MatSort!: MatSort;

  constructor(
    private router: Router,
    private holidayService: HolidaysService,
  ) {

  }

  ngOnInit(): void {
    this.dataSourceOfHolidayTable.paginator = this.MatPaginator;
    this.dataSourceOfHolidayTable.sort = this.MatSort;
    this.dataSourceOfHolidayTable.data = [];


    this.holidayService.getHolidayList().subscribe((response: any) => {
      if (response['status'] == 201) {
        this.dataSourceOfHolidayTable.data = JSON.parse(JSON.stringify(response.body));
      }
      console.log(response['body'])
    });
  }
  createholiday() {
    this.router.navigate(['/holidays/createholiday']);
  }
}
export interface Holiday {
  id: number;
  holiday_date: string;
  holiday_name: string;
  holiday_year: number;
}
