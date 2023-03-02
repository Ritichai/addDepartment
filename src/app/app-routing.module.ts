import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { MemberLayoutComponent } from './layouts/member-layout/member-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { memberGuard  } from './guards/member.guard';

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
    canActivateChild: [
      memberGuard
    ],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
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
