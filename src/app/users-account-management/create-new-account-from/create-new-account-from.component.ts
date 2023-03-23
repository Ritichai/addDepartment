import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-new-account-from',
  templateUrl: './create-new-account-from.component.html',
  styleUrls: ['./create-new-account-from.component.scss'],
})
export class CreateNewAccountFromComponent {
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

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {}

  cancel() {
    this.router.navigateByUrl('user-profile');
  }

  createNewAccount(form: NgForm) {
    console.log(form.value);
    this.userService
      .createUser(
        form.value['titleName'],
        form.value['firstName'],
        form.value['lastName'],
        form.value['employee_code'],
        form.value['employee_position'],
        form.value['user_role'],
        form.value['email'],
        form.value['phone_number'],
        form.value['username'],
        form.value['password']
      )
      .subscribe(
        (response) => {
          console.log(response);
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
            this.router.navigateByUrl('user-profile');
          });
        }
      );
  }
}
