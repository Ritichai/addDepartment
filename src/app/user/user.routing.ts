import { ResetPasswordComponent } from './../users-account-management/reset-password/reset-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {Routes} from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';


export const UserRoutes: Routes = [
    {
        path: 'user-profile',
        component: UserDashboardComponent
    },
    {
        path: 'edit-profile/:id',
        component: EditProfileComponent
    },
    {
      path:'reset-my-password/:id',
      component: ResetPasswordComponent
    }
];
