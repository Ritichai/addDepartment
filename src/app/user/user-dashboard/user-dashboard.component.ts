import { Router } from '@angular/router';
import { UsersService } from './../../services/user.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {

  dataUsers: any[] = []
  imgUsers:any;

  constructor(private usersService: UsersService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.usersService.getMyUserinfo().subscribe((response: any) => {
      const data = response.data;
      this.dataUsers.push(data);
      console.log(this.dataUsers);
    });

    this.usersService.getMyImg().subscribe(
      (response: any) => {
        this.imgUsers = response.image;
        //console.log(this.imgUsers);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  editProfile(usersname :string) {
    this.router.navigateByUrl('edit-profile/' + usersname);
  }
  getImages(data: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+data);
}


}
