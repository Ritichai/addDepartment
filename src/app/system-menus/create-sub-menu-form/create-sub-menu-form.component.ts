import swal from "sweetalert2";
import { NgForm } from '@angular/forms';
import { SystemMenusService } from './../../services/system-menus.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-sub-menu-form',
  templateUrl: './create-sub-menu-form.component.html',
  styleUrls: ['./create-sub-menu-form.component.scss']
})
export class CreateSubMenuFormComponent implements OnInit {


  sub_parent_id: number = 0;
  sub_sequence: string = "";
  sub_path: string = "";
  sub_title: string = "";
  sub_ab : string = "";
  sub_type : string = "";
  constructor(
    private router: Router,
    private systemMenusService: SystemMenusService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.sub_parent_id = params['id'];
    });
    }

  ngOnInit() {
  }

  cancel() {
    this.router.navigateByUrl('system-menus/sub-system-menus/'+this.sub_parent_id);
  }
  createSystemSubMenus(formData: NgForm) {
    this.systemMenusService.createSubMenuForm(
      this.sub_parent_id,
      formData.value['sub_sequence'],
      formData.value['sub_path'],
      formData.value['sub_title'],
      formData.value['sub_ab'],
      formData.value['sub_type'],
    ).subscribe(
      (res) => {
        if(res.status == 200){
          swal.fire({
            title: 'สำเร็จ!',
            text: 'เพิ่มเมนูย่อยใหม่เรียบร้อยแล้ว',
            icon: 'success',
            confirmButtonText: 'ตกลง',
          }).then((result) => {
            if (result.value) {
              this.router.navigateByUrl('/system-menus');
            }
          });
        }else{
          swal.fire({
            title: 'ผิดพลาด!',
            text: 'เพิ่มเมนูย่อยใหม่ไม่สำเร็จ',
            icon: 'error',
            confirmButtonText: 'ตกลง',
          });
        }
      },(err) => {
        swal.fire({
          title: 'ผิดพลาด!',
          text: 'มีข้อผิดพลาดในการเพิ่มเมนูย่อยใหม่',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
      }
    );
  }

}
