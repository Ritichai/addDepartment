import swal from "sweetalert2";
import { NgForm, Validators, FormControl, FormGroup } from "@angular/forms";
import { SystemMenusService } from "./../../services/system-menus.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
@Component({
  selector: "app-create-system-menus",
  templateUrl: "./create-system-menus.component.html",
  styleUrls: ["./create-system-menus.component.scss"],
})
export class CreateSystemMenusComponent implements OnInit {
  menuType = [
    { id: 1, value: "link" },
    { id: 2, value: "sub" },
  ];
  createNewMenu;
  menu_path: string = "";
  menu_title: string = "";
  menu_type: string = "";
  menu_icontype : string = "";
  menu_collapse : string = "";
  constructor(
    private router: Router,
    private systemMenusService: SystemMenusService,
    private fb: FormBuilder
  ) {
    this.createNewMenu = this.fb.group({
      menu_path: new FormControl("", Validators.required),
      menu_title: new FormControl("", Validators.required),
      menu_type: new FormControl("", Validators.required),
      menu_icontype: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  cancel() {
    this.router.navigateByUrl("/system-menus/menu-setting");
  }


  createSystemMenus(formData: NgForm) {
    //ตรวจสอบว่า ค่าว่าง
    if (!formData.valid) {
      return;
    }
    //เพิ่มข้อมูล
    this.systemMenusService
      .createSystemMenus(
        formData.value["menu_path"],
        formData.value["menu_title"],
        formData.value["menu_type"],
        formData.value["menu_icontype"],
        formData.value["menu_collapse"]
      )
      .subscribe(
        (res) => {
          console.log(res);
          swal.fire({
            title: "สำเร็จ!",
            text: "เพิ่มเมนูระบบใหม่เรียบร้อยแล้ว",
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then((result) => {
            if (result.value) {
              this.router.navigateByUrl("/system-menus/menu-setting");
            }
          });
        },
        (err) => {
          console.log(err);
          swal.fire({
            title: "ผิดพลาด!",
            text: "เพิ่มเมนูระบบใหม่ไม่สำเร็จ",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
      );
  }
}
