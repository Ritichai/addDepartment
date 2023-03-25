import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemMenusService } from '../../services/system-menus.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-edit-system-menus',
  templateUrl: './edit-system-menus.component.html',
  styleUrls: ['./edit-system-menus.component.scss']
})
export class EditSystemMenusComponent implements OnInit {


  menuType = [
    {
      id: 1,
      value: 'link'
    },
    {
      id: 2,
      value: 'sub'
    }
  ]

  menu_id: any;
menu_info: any;

  constructor(
    private systemMenusService: SystemMenusService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

      this.menu_info = {
        menu_path: '',
        menu_title: '',
        menu_type: '',
        menu_icontype: '',
        menu_collapse: ''
      }
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log('params', params['id']);
      this.systemMenusService.getSysteMenusForEdit(params['id'])
      .subscribe((response:any) => {
        this.menu_id = params['id'];
        if (response['status'] == 200) {
          this.menu_info = response['body']['data'][0];
        } else {
          console.log('ไม่พบข้อมูลที่ต้องการแก้ไข');
        }
      }, (err) => {
        console.log('เรียกข้อมูลของผู้ใช้งานมาแก้ไขไม่สำเร็จ', err);
      }, () => {
        console.log('เรียกข้อมูลของผู็ใช้งานมาแก้ไขสำเร็จแล้ว', this.menu_info);
      });
    });
  }




  cancel() {
    this.router.navigateByUrl('/system-menus/menu-setting');
  }

  editSystemMenu(form :NgForm){
    console.log('form55', form.value);
    this.systemMenusService.editSystemMenus(
      form.value['menu_path'],
      form.value['menu_title'],
      form.value['menu_type'],
      form.value['menu_icontype'],
      form.value['menu_collapse'],
      this.menu_id
    ).subscribe((response) => {
      console.log('ข้อมูลที่ กรอกใหม่', response);
    }, (err) => {
      console.log('ไม่สามารถที่จะแก้ข้อมูลได้', err);
    }, () => {
      swal.fire({
        title: 'แก้ไขข้อมูลเรียบร้อย',
        icon: 'success',
        confirmButtonText: 'ตกลง'
      }).then((result) => {
        if (result.value) {
          this.router.navigateByUrl('/system-menus/menu-setting');
        }
      });
    });
  }

}
