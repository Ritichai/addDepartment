import { ImageManagementSystemModule } from './image-management-system/image-management-system.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { MemberLayoutComponent } from './layouts/member-layout/member-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Error403Component } from './error403/error403.component';

import { MemberGuard } from './guards/member.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: GuestLayoutComponent,
    loadChildren: () => import('./guests/guests.module').then(m => m.GuestsModule)
  },
  {
    path: '',
    component: MemberLayoutComponent,
    canActivate: [
      MemberGuard
    ],
    children: [
      {
        path: '',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'users-account-management',
        loadChildren: () => import('./users-account-management/users-account-management.module').then(m => m.UsersAccountManagementModule)
      },
      {
        path:'system-menus',
        loadChildren: () => import('./system-menus/system-menus.module').then(m => m.SystemMenusModule)
      },
      {
        path:'user-roles',
        loadChildren: () => import('./user-roles/user-roles.module').then(m => m.UserRolesModule)
      },
      {
        path:'images-management',
        loadChildren: () => import('./image-management-system/image-management-system.module').then(m => m.ImageManagementSystemModule)
      },
      {
        path:'devices',
        loadChildren: () => import('./devices/devices.module').then(m => m.DevicesModule)
      },
    ]
  },
  {
    path: '',
    component: MemberLayoutComponent,
    canActivate: [
      MemberGuard
    ],
    children: [
      {
        path: '',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'users-account-management',
        loadChildren: () => import('./users-account-management/users-account-management.module').then(m => m.UsersAccountManagementModule)
      },
      {
        path:'user-profile',
        loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)
      }
    ]
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: 'error-403',
    component: Error403Component
  },
  {
    path: '**',
    redirectTo: '/page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
