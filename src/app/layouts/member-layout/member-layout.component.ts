import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/user.service';
import { UserSidebarService } from '../../services/user-sidebar.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-member-layout',
  templateUrl: './member-layout.component.html',
  styleUrls: ['./member-layout.component.scss']
})
export class MemberLayoutComponent implements OnInit {
  dataUsers: any[] = []
  imgUsers:any;
  imgStatus: boolean = false;
  showFiller = false;
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  menuItems = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      type: 'link',
      link: '/dashboard'
    },
    {
      name: 'Users Account Management',
      icon: 'people',
      type: 'link',
      link: '/users-account-management'
    },
    {
      name: 'Settings',
      icon: 'settings',
      collapse: 'settings',
      type: 'sub',
      sub: [
        {
          name: 'Profile',
          icon: 'person',
          type: 'link',
          link: '/settings/profile'
        },
        {
          name: 'Password',
          icon: 'lock',
          type: 'link',
          link: '/settings/password'
        }
      ],
      link: '/settings'
    },
    {
      name: 'Logout',
      icon: 'logout',
      type: 'command'
    }
  ];
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private userSidebarService: UserSidebarService,
    private userService: UsersService,
    private sanitizer: DomSanitizer,
  ) {

  }

  ngOnInit() {
    this.userSidebarService.getMySidebarMenu().subscribe((res: any) => {
      if (res.status == 200) {
        this.menuItems = res.body.data
        .map((item: any) => {
          return {
            name: item.menu_title,
            icon: item.menu_icontype,
            type: item.menu_type,
            link: item.menu_path,
            collapse: item.menu_collapse,
            sub: item.system_sub_menus
            .filter((subItem: any) => subItem.sub_enabled === 0)
            .map((subItem: any) => {
              return {
                name: subItem.sub_title,
                link: subItem.sub_path
              }
            })
          }
        });
      }
    },
      (err: any) => {
        console.log(err);
      },
      () => {
      });

    this.router.events.subscribe((val: any) => {
      if (val['url'] != undefined) {
        //console.log(val['url'].split('/')[1]);
      }
    });
    this.userService.getMyUserinfo().subscribe((response: any) => {
      const data = response.data;
      this.dataUsers.push(data);
    });
    this.userService.getMyImg().subscribe(
      (response: any) => {
        if(response.message === "Image not found"){
          this.imgUsers = "../../../assets/images/default.jpg";
        }else if(response.message == "Image found"){
          this.imgStatus = true;
          this.imgUsers = response.image;
        }
      },
      (error: any) => {

      }
    );
  }

  // @Input() opened: boolean = true;
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  events: string[] = [];
  // opened: boolean = true;

  gotoPage(menuLink:any,subItemLink:any){
    this.router.navigate([menuLink,subItemLink]);
  }

  getImages(data: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+data);
}
}
