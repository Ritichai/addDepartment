import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-user-info',
  templateUrl: './view-user-info.component.html',
  styleUrls: ['./view-user-info.component.scss']
})
export class ViewUserInfoComponent {

  profileData :any[] = []
  id:any
   imgUsers:any;
  imgStatus: boolean = false;
  constructor(
    private userService:UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
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
        this.userService.getImgById(this.id).subscribe(
      (response: any) => {
        if(response.message === "Image not found"){
          this.imgUsers = "../../../assets/images/default.jpg";
        }else if(response.message == "Image found"){
          this.imgStatus = true;
          this.imgUsers = response.image;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  cancel(){
  this.router.navigate(['/users-account-management'])
}
  getImages(data: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+data);
}
}

