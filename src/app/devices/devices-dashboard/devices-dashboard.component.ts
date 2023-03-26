import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {DevicesService} from "../../services/devices.service";
import * as moment from "moment";

@Component({
  selector: 'app-devices-dashboard',
  templateUrl: './devices-dashboard.component.html',
  styleUrls: ['./devices-dashboard.component.scss']
})
export class DevicesDashboardComponent implements OnInit {
  columnsDevicesManagementTable: string[] = ['device_number', 'brand_name', 'model_name', 'os_name', 'color_name', 'start_date', 'end_date', 'edit', 'remove', 'info'];
  dataSourceOfDevicesManagementTable = new MatTableDataSource<DevicesManagementModel>();
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private devicesService: DevicesService
  ) {}

  ngOnInit() {
    // this.dataSourceOfDevicesManagementTable.paginator = this.paginator;
    // this.dataSourceOfDevicesManagementTable.sort = this.sort;
    this.dataSourceOfDevicesManagementTable.data = [];

    this.devicesService.getDevicesList().subscribe(
      (data: any) => {
        this.dataSourceOfDevicesManagementTable.data = data.body;
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }

  gotoCreateNewDevicePage() {
    console.log('gotoCreateNewDevicePage');
    this.router.navigateByUrl('/devices/create-new-device');
  }

  dateFormat(date: string) {
    return moment(date).format('DD/MM/YYYY');
  }

  gotoDeviceDetailPage(item: DevicesManagementModel) {
    console.log('gotoDeviceDetailPage', item);
    // this.router.navigateByUrl('/devices/device-detail/' + item.id);
  }

  gotoEditDeviceItem(device_id: number) {
    this.router.navigateByUrl('/devices/edit-device/' + device_id);
  }

  deleteDeviceItem(item: DevicesManagementModel) {
    Swal.fire({
      title: 'ระงับอุปกรณ์',
      text: 'คุณต้องการลบ ' + item.device_number + ' จริงหรือไม่ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',

    }).then((result) => {
      if (result.isConfirmed) {
        this.devicesService.deleteDevice(item.id).subscribe((response) => {
          // console.log(response);
        }, (err) => {
          console.log('delete user account fail', err);
        }, () => {
          Swal.fire({
            title: 'การลบอุปกรณ์',
            text: 'อุปกรณ์ ' + item.device_number + ' ถูกระงับแล้ว',
            icon: 'success',
            confirmButtonAriaLabel: 'OK'
          }).then(() => {
            this.ngOnInit();
          });
        })
      }
    })
  }
}

export interface DevicesManagementModel {
  id: number;
  device_number: string;
  brand_name: string;
  model_name: string;
  os_name: string;
  color_name: string;
  start_date: string;
  end_date: string;
  enabled: boolean;
}
