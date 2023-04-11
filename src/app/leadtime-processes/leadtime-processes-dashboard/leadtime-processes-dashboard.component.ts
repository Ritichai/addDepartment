import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeadTimeService } from 'src/app/services/leadtime-processe.service';

@Component({
  selector: 'app-leadtime-processes-dashboard',
  templateUrl: './leadtime-processes-dashboard.component.html',
  styleUrls: ['./leadtime-processes-dashboard.component.scss']
})
export class LeadtimeProcessesDashboardComponent {

  leadtimes: any;
  columnsSystemMenuTable: string[] = [
    "department",
    "process_group",
    "process_name",
    "leadtime",
  ];


  dataSourceOfLeadtimeProcessTable = new MatTableDataSource<LeadtimeProcess>();
  @ViewChild(MatPaginator, { static: true }) MatPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) MatSort!: MatSort;
  @ViewChild('leadtimeInput') leadtimeInput!: ElementRef;

  constructor(
    private router: Router,
    private leadtimeService: LeadTimeService
  ) {
    this.leadtimes = {
      leadtime: ''
    }
  }

  ngOnInit(): void {
    this.dataSourceOfLeadtimeProcessTable.paginator = this.MatPaginator;
    this.dataSourceOfLeadtimeProcessTable.sort = this.MatSort;
    this.dataSourceOfLeadtimeProcessTable.data = [];

    this.leadtimeService.getLeadtimeList().subscribe((response: any) => {
      if (response['status'] == 201) {
        this.dataSourceOfLeadtimeProcessTable.data = JSON.parse(JSON.stringify(response.body));
        this.leadtimes = response['body']
        console.log(this.leadtimes)
      }
    });
  }

  getLeadtimeValue(element: any) {
    return element.leadtime;
  }
  editLeadLeadtimeByID(id: any, leadtime: any) {
    this.leadtimeService.editLeadtimeByID(id, leadtime).subscribe((response: any) => {
      if (response['status'] == 201) {
        this.dataSourceOfLeadtimeProcessTable.data = JSON.parse(JSON.stringify(response.body));
        this.leadtimes = response['body']
        this.ngOnInit();
      }
    });
  }
}

export interface LeadtimeProcess {
  id: number;
  department: string;
  process_group: string;
  process_name: string;
  leadtime: string;
}
