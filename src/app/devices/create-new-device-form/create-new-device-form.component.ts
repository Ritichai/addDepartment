import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DevicesService} from "../../services/devices.service";
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-create-new-device-form',
  templateUrl: './create-new-device-form.component.html',
  styleUrls: ['./create-new-device-form.component.scss']
})
export class CreateNewDeviceFormComponent implements OnInit {
  constructor(
    private deviceService: DevicesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.router.navigateByUrl('/devices');
  }

  addNewDevice(form: NgForm){
    if(form.value['device_number'] == null || form.value['device_number'] == ''){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'กรุณากรอกหมายเลขอุปกรณ์',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    if(form.value['start_date'] == null || form.value['start_date'] == ''){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'กรุณาเลือกวันที่เริ่มใช้งาน',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    if(form.value['end_date'] == null || form.value['end_date'] == ''){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'กรุณาเลือกวันที่สิ้นสุดการใช้งาน',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    this.deviceService.createNewDevice(
      form.value['device_number'],
      form.value['brand_name'],
      form.value['model_name'],
      form.value['os_name'],
      form.value['color_name'],
      form.value['start_date'],
      form.value['end_date']
    ).subscribe(
      (data: any) => {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'เพิ่มอุปกรณ์ใหม่สำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/devices');
          }
        });
      },
      (error: any) => {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด!',
          text: 'เพิ่มอุปกรณ์ใหม่ไม่สำเร็จ',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    );
  }
}
