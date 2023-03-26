import {Component, OnInit} from '@angular/core';
import {DevicesService} from "../../services/devices.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-device-form',
  templateUrl: './edit-device-form.component.html',
  styleUrls: ['./edit-device-form.component.scss']
})
export class EditDeviceFormComponent implements OnInit {
  deviceId: number | undefined;
  deviceInfo: any = {
    device_number: '',
    brand_name: '',
    start_date: '',
    end_date: '',
    model_name: '',
    os_name: '',
    color: '',
  }

  constructor(
    private deviceService: DevicesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.deviceId = params['device_id'];
      if (this.deviceId == undefined) {
        return;
      }

      this.deviceService.getDeviceById(this.deviceId).subscribe((response) => {
        if (response['status'] == 200 || response['status'] == 201) {
          this.deviceInfo = response['body'];
          this.deviceInfo.start_date = this.deviceInfo.start_date.split('T')[0];
          this.deviceInfo.end_date = this.deviceInfo.end_date.split('T')[0];
        } else {
          console.log('fail');
        }
      }, (err) => {
        console.log('get a device info for edit fail', err);
      }, () => {
        console.log('get a device info for edit complete.', this.deviceInfo);
      });
    });
  }

  cancel() {
    this.router.navigateByUrl('/devices');
  }

  onSubmit(form: NgForm) {
    if (this.deviceId == undefined) {
      return;
    }
    if (this.deviceInfo.device_number == '' || this.deviceInfo.start_date == '' || this.deviceInfo.end_date == '') {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง'
      });
    }

    this.deviceService.updateDevice(
      this.deviceId,
      this.deviceInfo.device_number,
      this.deviceInfo.brand_name,
      this.deviceInfo.model_name,
      this.deviceInfo.os_name,
      this.deviceInfo.color,
      this.deviceInfo.start_date,
      this.deviceInfo.end_date,
    ).subscribe((response) => {
      if (response['status'] == 200 || response['status'] == 201) {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'แก้ไขข้อมูลอุปกรณ์เรียบร้อยแล้ว',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/devices');
          }
        });
      } else {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด!',
          text: 'ไม่สามารถแก้ไขข้อมูลอุปกรณ์ได้',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง'
        });
      }
    });
  }
}
