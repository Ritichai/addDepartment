import { NgForm, FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemMenusService } from '../../services/system-menus.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-system-menus',
  templateUrl: './edit-system-menus.component.html',
  styleUrls: ['./edit-system-menus.component.scss'],
})
export class EditSystemMenusComponent implements OnInit {
  menuType = [
    {
      id: 1,
      value: 'link',
    },
    {
      id: 2,
      value: 'sub',
    },
  ];

  menu_id: any;
  menu_info: any;


  form: FormGroup = new FormGroup({
    menu_path: new FormControl(''),
    menu_title: new FormControl(''),
    menu_type: new FormControl(''),
    menu_icontype: new FormControl(''),
    menu_collapse: new FormControl('')
  });
  submitted = false;

  constructor(
    private systemMenusService: SystemMenusService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.menu_info = {
      menu_path: '',
      menu_title: '',
      menu_type: '',
      menu_icontype: '',
      menu_collapse: '',
    };

    this.form = this.formBuilder.group({
      menu_path: ["", Validators.required],
      menu_title: ["", Validators.required],
      menu_type: ["", Validators.required],
      menu_icontype: [""],
      menu_collapse: [""]
    });

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log('params', params['id']);
      this.systemMenusService.getSysteMenusForEdit(params['id']).subscribe(
        (response: any) => {
          this.menu_id = params['id'];
          if (response['status'] == 200) {
            this.menu_info = response['body']['data'][0];
          } else {
            console.log('ไม่พบข้อมูลที่ต้องการแก้ไข');
          }
        },
        (err) => {
          console.log('เรียกข้อมูลของผู้ใช้งานมาแก้ไขไม่สำเร็จ', err);
        },
        () => {
          console.log(
            'เรียกข้อมูลของผู็ใช้งานมาแก้ไขสำเร็จแล้ว',
            this.menu_info
          );
        }
      );
    });
  }

  cancel() {
    this.router.navigateByUrl('/system-menus/menu-setting');
  }

  editSystemMenu() {
    console.log('form55', this.form.value);
    this.systemMenusService
      .editSystemMenus(
        this.form.value['menu_path'],
        this.form.value['menu_title'],
        this.form.value['menu_type'],
        this.form.value['menu_icontype'],
        this.form.value['menu_collapse'],
        this.menu_id
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
            text: 'แก้ไขเมนูเรียบร้อยแล้ว',
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
