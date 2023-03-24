import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EditUserAccountComponent } from './edit-user-account/edit-user-account.component';
import { CreateNewAccountFromComponent } from './create-new-account-from/create-new-account-from.component';
import {Routes} from '@angular/router';
import { UserAccountsDashboardComponent } from './users-account-dashboard/users-account-dashboard.component';


export const UsersAccountManagementRoutes: Routes = [
    {
        path: '',
        component: UserAccountsDashboardComponent
    },
    {
      path:'create-new-account',
      component:CreateNewAccountFromComponent
    },
    {
      path:'edit/:user_id',
      component:EditUserAccountComponent
    },
    {
      path:'reset-password/:user_id',
      component:ResetPasswordComponent
    }
];
