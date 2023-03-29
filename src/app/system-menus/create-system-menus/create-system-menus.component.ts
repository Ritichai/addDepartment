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

  form: FormGroup = new FormGroup({
    menu_path: new FormControl(''),
    menu_title: new FormControl(''),
    menu_type: new FormControl(''),
    menu_icontype: new FormControl(''),
    menu_collapse: new FormControl('')
  });
  submitted = false;

  menuType = [
    { id: 1, value: "link" },
    { id: 2, value: "sub" },
  ];
  constructor(
    private router: Router,
    private systemMenusService: SystemMenusService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      menu_path: ["", Validators.required],
      menu_title: ["", Validators.required],
      menu_type: ["", Validators.required],
      menu_icontype: [""],
      menu_collapse: [""]
    });
  }

  ngOnInit() {}

  cancel() {
    this.router.navigateByUrl("/system-menus/menu-setting");
  }


  createSystemMenus() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.systemMenusService
      .createSystemMenus(
        this.form.value["menu_path"],
        this.form.value["menu_title"],
        this.form.value["menu_type"],
        this.form.value["menu_icontype"],
        this.form.value["menu_collapse"]
      )
      .subscribe(
        (response) => {
          console.log(response);
        },
        (err) => {
        },
        () => {
          swal.fire({
            title: 'สำเร็จ',
            text: 'สร้างเมนูใหม่เรียบร้อยแล้ว',
            icon: 'success',
            confirmButtonAriaLabel: 'OK',
          }).then(() => {
            this.router.navigateByUrl('/system-menus/menu-setting');
          });
        }
      );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
