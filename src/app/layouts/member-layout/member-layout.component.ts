import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserSidebarService } from '../../services/user-sidebar.service';

@Component({
  selector: 'app-member-layout',
  templateUrl: './member-layout.component.html',
  styleUrls: ['./member-layout.component.scss']
})
export class MemberLayoutComponent implements OnInit {

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
    private userSidebarService: UserSidebarService
  ) {

  }

  ngOnInit() {
    this.userSidebarService.getMySidebarMenu().subscribe((res: any) => {
     // console.log(res);
      if (res.status == 200) {
        this.menuItems = res.body.data.map((item: any) => {
          return {
            name: item.menu_title,
            icon: item.menu_icontype,
            type: item.menu_type,
            link: item.menu_path,
            collapse: item.menu_collapse,
            sub: item.system_sub_menus.map((subItem: any) => {
              return {
                name: subItem.sub_title,
                icon: subItem.menu_icontype,
                type: subItem.menu_type,
                link: subItem.menu_path
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
        console.log('complete');
      });
    console.log();
    this.router.events.subscribe((val: any) => {
      if (val['url'] != undefined) {
        console.log(val['url'].split('/')[1]);
      }

    });
  }

  // @Input() opened: boolean = true;
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  events: string[] = [];
  // opened: boolean = true;

}
