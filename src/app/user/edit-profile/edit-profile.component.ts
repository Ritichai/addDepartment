import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormControl, FormBuilder, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../../services/user.service';
import { Component } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  file: any;
  filename = '';
  username: string = '';
  id: number = 0;
  dataUsers: any[] = []
  imageUrl = new Map();
  progress = 0;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    titlename: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    employee_code: new FormControl(''),
    employee_position: new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl(''),
    department_id: new FormControl(''),
  });
  submitted = false;

  constructor(
    private userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(8)]],
      titlename: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      employee_code: ['', [Validators.required]],
      employee_position: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('[0-9]*')]],
      department_id: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.id = id;
    });
    this.userService.getMyUserinfo().subscribe((response: any) => {
      const data = response.data;
      this.dataUsers.push(data);
      console.log(this.dataUsers);
    });
  }

  editMyProfile() {
     this.submitted = true;
     if (this.form.invalid) {
       return;
     }
    this.userService
      .editUserAccountInfoByID(
        this.id,
        this.form.value['username'],
        this.form.value['titlename'],
        this.form.value['firstname'],
        this.form.value['lastname'],
        this.form.value['email'],
        this.form.value['phone_number'],
        this.form.value['employee_code'],
        this.form.value['employee_position'],
        this.form.value['department_id']
      )
      .subscribe(
        (response: any) => {},
        (err) => {
          console.log('Creating a new user account is an error', err);
        },
        () => {
          console.log('Creating a new user account complete.');
          swal
            .fire({
              title: 'สำเร็จ',
              text: 'แก้ไขข้อมูลโปรไฟล์สำเร็จ',
              icon: 'success',
              confirmButtonAriaLabel: 'OK',
            })
            .then(() => {
              this.router.navigateByUrl('user-profile');
            });
        }
      );
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
  uploadFile(){
    this.userService.editUserPictureByToken(this.file).subscribe((event: any) => {
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

  clearFileInput() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fileInput.value = '';
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
    this.router.navigateByUrl('user-profile');
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
}

