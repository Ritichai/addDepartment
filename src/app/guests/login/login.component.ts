import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthorizationService } from '../../services/user-authorization.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  loginWrang = false;

  constructor(
    private userAuthorizationService: UserAuthorizationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm.setValue({
      username: '',
      password: ''
    });
  }

  inputUsername() {
    this.loginWrang = false;
  }

  login() {
    console.log(this.loginForm.value);
    this.userAuthorizationService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((response: any) => {

      if (response['status'] == 200) {
        // login success
        if (response['body']['isMember'] == true) {
          // redirect to member dashboard
          console.log("member");
          localStorage.setItem('token', response['body']['token']);
          this.router.navigate(['dashboard']);
        } else {
          // redirect to guest dashboard
          console.log("guest");
          localStorage.clear();
        }
      } else {
        // login failed
        localStorage.clear();
      }
    }, (error) => {
      console.log(error);
      this.loginWrang = true;
      localStorage.clear();
    }, () => {
      console.log("completed");

    });

  }

}
