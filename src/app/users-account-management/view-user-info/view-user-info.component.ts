import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-view-user-info',
  templateUrl: './view-user-info.component.html',
  styleUrls: ['./view-user-info.component.scss']
})
export class ViewUserInfoComponent {

  profileData :any[] = []
  id:any
  constructor(
    private userService:UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

   ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['user_id'];
      this.userService.getUserInfoById(this.id).subscribe((data:any) => {
        //console.log("this data",data)
        this.profileData.push(data)
        console.log("this profileData",this.profileData)
      })
    });
  }
  cancel(){
  this.router.navigate(['/users-account-management'])
}
}

