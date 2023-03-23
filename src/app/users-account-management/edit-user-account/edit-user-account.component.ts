import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-edit-user-account',
  templateUrl: './edit-user-account.component.html',
  styleUrls: ['./edit-user-account.component.scss']
})
export class EditUserAccountComponent implements OnInit {

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
    password: ''
  };

  constructor(
    private userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

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

  createNewAccount(form: NgForm) {
    /*
     * titleName
     * firstName
     * lastName
     * employee_code
     * employee_position
     * user_role
     * email
     * phone_number
     * username
     * password
     */
    console.log(form.value)
    this.userService.editUserAccount(
      form.value['titleName'],
      form.value['firstName'],
      form.value['lastName'],
      form.value['employee_code'],
      form.value['employee_position'],
      form.value['user_role'],
      form.value['email'],
      form.value['phone_number'],
      form.value['username'],
      this.user_id
    ).subscribe((response) => {
      console.log(response);
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
}
