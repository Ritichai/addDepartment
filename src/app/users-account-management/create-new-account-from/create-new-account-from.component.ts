import { AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-new-account-from',
  templateUrl: './create-new-account-from.component.html',
  styleUrls: ['./create-new-account-from.component.scss'],
})
export class CreateNewAccountFromComponent {

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
    password: new FormControl(''),

  });
  submitted = false;

  userRoles = [
    {
      id: 1,
      value: 'ผู้ใช้ทั่วไป',
    },
    {
      id: 2,
      value: 'นักจัดการระบบ',
    },
  ];

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

  constructor(
    private userService: UsersService,
    private router: Router,
    private formBuilder: FormBuilder) {

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
      password: ['', [Validators.required, Validators.minLength(8)]],

    });

  }


  cancel() {
    this.router.navigateByUrl('users-account-management');
  }
  // createNewAccount(form: NgForm) {
  //   this.userService.createUser(
  //       form.value['titleName'],
  //       form.value['firstName'],
  //       form.value['lastName'],
  //       form.value['employee_code'],
  //       form.value['employee_position'],
  //       form.value['user_role'],
  //       form.value['email'],
  //       form.value['phone_number'],
  //       form.value['username'],
  //       form.value['password']
  //     )
  //     .subscribe(
  //       (response) => {
  //         console.log(response);
  //       },
  //       (err) => {
  //         console.log('Creating a new user account is an error', err);
  //       },
  //       () => {
  //         console.log('Creating a new user account complete.');
  //         Swal.fire({
  //           title: 'สำเร็จ',
  //           text: 'สร้างบัญชีผู้ใช้เรียบร้อยแล้ว',
  //           icon: 'success',
  //           confirmButtonAriaLabel: 'OK',
  //         }).then(() => {
  //           this.router.navigateByUrl('users-account-management');
  //         });
  //       }
  //     );
  // }

  createNewAccount() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.userService
      .createUser(
        this.form.value['titleName'],
        this.form.value['firstName'],
        this.form.value['lastName'],
        this.form.value['employee_code'],
        this.form.value['employee_position'],
        this.form.value['user_role'],
        this.form.value['email'],
        this.form.value['phone_number'],
        this.form.value['username'],
        this.form.value['password'],

      )
      .subscribe((response) => {
          console.log("ss",response);
        },
        (err) => {
          console.log('Creating a new user account is an error', err);
        },
        () => {
          console.log('Creating a new user account complete.');
          Swal.fire({
            title: 'สำเร็จ',
            text: 'สร้างบัญชีผู้ใช้เรียบร้อยแล้ว',
            icon: 'success',
            confirmButtonAriaLabel: 'OK',
          }).then(() => {
            this.router.navigateByUrl('users-account-management');
          });
        }
      );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
