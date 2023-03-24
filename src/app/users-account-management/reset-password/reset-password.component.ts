import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../../services/user.service';
import { Component } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  user_id: any;
  new_password: any = {
    password: '',
    confirm_password: ''
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
          this.new_password = response['body'];
        } else {
          console.log('fail');
        }
      }, (err) => {
        console.log('get a user info for edit fail', err);
      }, () => {
        console.log('get a user info for edit complete.', this.new_password);
      });
    });
  }

  cancel() {
    this.router.navigate(['/users-account-management']);
  }
  resetPassword(form:NgForm) {
    console.log("sssssss",form.value);
    this.userService.resetPassword(
      this.user_id,
      form.value['password'],
      form.value['confirm_password']
    ).subscribe((response) => {
      if(response["status"] == 200){
        swal.fire({
          title: 'เปลี่ยนรหัสไม่สำเร็จ',
          text: 'เนื่องจากรหัสผ่านไม่ตรงกัน',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        })
      }
      else if(response["status"] == 201){
        swal.fire({
          title: 'เปลี่ยนรหัสสำเร็จ',
          text: 'เปลี่ยนรหัสผ่านสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
            this.router.navigate(['/users-account-management']);
        });
      }
    }, (err) => {
      console.log('reset password fail', err);
    }, () => {
      console.log('method resetPassword complete.');
    });
  }
}
