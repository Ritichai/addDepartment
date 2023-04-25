import swal from "sweetalert2";
import { NgForm, FormGroup, FormControl, FormBuilder, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
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



  form: FormGroup = new FormGroup({
    sub_sequence: new FormControl(''),
    sub_path: new FormControl(''),
    sub_title: new FormControl(''),
    sub_ab: new FormControl(''),
    sub_type: new FormControl('')
  });
  submitted = false;

  constructor(
    private router: Router,
    private systemMenusService: SystemMenusService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.sub_parent_id = params['id'];
    });
    this.form = this.formBuilder.group({
      sub_sequence: ["", [Validators.required,Validators.pattern("^[0-9]*$")]],

      sub_path: ["", Validators.required],
      sub_title: ["", Validators.required],
      sub_ab: [""],
      sub_type: [""]
    });
  }

  ngOnInit() {
  }

  cancel() {
    this.router.navigateByUrl('system-menus/sub-system-menus/' + this.sub_parent_id);
  }
  createSystemSubMenus() {
    console.log("click createSystemSubMenus");
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.systemMenusService.createSubMenuForm(
      this.sub_parent_id,
      this.form.value['sub_sequence'],
      this.form.value['sub_path'],
      this.form.value['sub_title'],
      this.form.value['sub_ab'],
      this.form.value['sub_type'],
    )    .subscribe(
      (response) => {
       // console.log(response);
      },
      (err) => {
      },
      () => {
        swal.fire({
          title: 'สำเร็จ',
          text: 'สร้างซัพเมนูใหม่เรียบร้อยแล้ว',
          icon: 'success',
          confirmButtonAriaLabel: 'OK',
        }).then(() => {
          this.router.navigateByUrl('system-menus/sub-system-menus/' + this.sub_parent_id);
        });
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
