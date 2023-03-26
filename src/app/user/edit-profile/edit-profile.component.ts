import { NgForm } from '@angular/forms';
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
  username: string = '';
  dataUsers: any[] = []
  constructor(
    private userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const username = params['username'];
      this.username = username;
    });
    this.userService.getMyUserinfo().subscribe((response: any) => {
      const data = response.data;
      this.dataUsers.push(data);
      console.log(this.dataUsers);
    });
  }
  editMyProfile(form: NgForm) {
     console.log(form.value)
    this.userService
      .editUserAccountInfoByUsername(
        this.username,
        form.value['titlename'],
        form.value['firstname'],
        form.value['lastname'],
        form.value['email'],
        form.value['phone_number'],
        form.value['employee_code'],
        form.value['employee_position'],
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
}
