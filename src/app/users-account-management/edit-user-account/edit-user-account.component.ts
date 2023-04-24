import { AbstractControl } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType, HttpResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-edit-user-account',
  templateUrl: './edit-user-account.component.html',
  styleUrls: ['./edit-user-account.component.scss']
})
export class EditUserAccountComponent implements OnInit {

  file: any;
  filename = '';
  progress = 0;
  imageUrl = new Map();
  userRoles = [
    {
      id: 1,
      value: 'ผู้ใช้ทั่วไป'
    },
    {
      id: 2,
      value: 'นักจัดการระบบ'
    }
  ]

  departMents_list = [
    {
      id: 1,
      value: 'Sale1',
    },
    {
      id: 2,
      value: 'Sale2',
    },
    {
      id: 3,
      value: 'Sale3',
    }
  ];
  user_id: any;
  user_info: any = {
    titlename: '',
    firstname: '',
    lastname: '',
    employee_code: '',
    employee_position: '',
    user_role: '',
    email: '',
    phone_number: '',
    username: '',
    password: '',
    department_id: ''
  };

  form: FormGroup = new FormGroup({
    titleName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    employee_code: new FormControl(''),
    employee_position: new FormControl(''),
    user_role: new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl(''),
    username: new FormControl(''),
    department_id: new FormControl('')
  });
  submitted = false;

  constructor(
    private userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {

    this.form = this.formBuilder.group({
      titleName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      employee_code: ['', [Validators.required]],
      employee_position: ['', [Validators.required]],
      user_role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('[0-9]*')]],
      username: ['', [Validators.required,Validators.minLength(8)]],
      department_id: ['', [Validators.required]]
    });
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.userService.getAccountInfoForEdit(params['user_id']).subscribe((response) => {
        this.user_id = params['user_id'];
        if (response['status'] == 200) {
          this.user_info = response['body'];
        } else {
          console.log('fail');
        }
      }, (err) => {
        console.log('get a user info for edit fail', err);
      }, () => {
        console.log('get a user info for edit complete.', this.user_info);
      });
    });
  }

  cancel() {
    this.router.navigateByUrl('users-account-management');
  }

  editAccount() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    //console.log(this.form.value)
    this.userService.editUserAccount(
      this.form.value['titleName'],
      this.form.value['firstName'],
      this.form.value['lastName'],
      this.form.value['employee_code'],
      this.form.value['employee_position'],
      this.form.value['user_role'],
      this.form.value['email'],
      this.form.value['phone_number'],
      this.form.value['username'],
      this.user_id,
      this.form.value['department_id']
    ).subscribe((response) => {
      //console.log(response);
    }, (err) => {
      console.log('Creating a new user account is an error', err);
    }, () => {
      console.log("Creating a new user account complete.");
      swal.fire({
        title: 'สำเร็จ',
        text: 'แก้ไขข้อมูลบัญชีผู้ใช้แล้ว',
        icon: 'success',
        confirmButtonAriaLabel: 'OK'
      }).then(() => {
        this.router.navigateByUrl('users-account-management')
      })
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      this.filename = file.name || '';
      console.log(this.file);
    }
  }

  async uploadSuccess(data: any) {
    await swal.fire({
      title: 'บันทึกสำเร็จ!',
      text: data,
      icon: 'success',
      confirmButtonText: 'ปิด',
    });
    this.file = null;
    this.progress = 0;
    this.clearFileInput();
    this.router.navigateByUrl('users-account-management');
  }
  clearFileInput() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fileInput.value = '';
  }

  uploadFile(){
    this.userService.editUserPictureByID(this.user_id,this.file).subscribe((event: any) => {
      if (event.status === 200) {
        this.uploadFail(event.body.message);
      } else {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess(event.body.message);
        }
      }
    });
  }

  uploadFail(data: any) {
    swal.fire({
      title: 'บันทึกไม่สำเร็จ!',
      text: data,
      icon: 'error',
      confirmButtonText: 'ปิด',
    });
    this.progress = 0;
  }

  checkInputSelect() {
    if (this.file) {
      this.uploadFile();
    } else {
      swal.fire({
        title: 'กรุณาเลือกไฟล์',
        icon: 'warning',
        confirmButtonText: 'ปิด',
      });
    }
  }
  getImgUrl(file: File): any {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl.set(file, e.target.result);
    };
    if (!this.imageUrl.has(file)) {
      reader.readAsDataURL(file);
    } else {
      return this.imageUrl.get(file);
    }
  }
}
