import { EditUserAccountComponent } from './edit-user-account/edit-user-account.component';
import { CreateNewAccountFromComponent } from './create-new-account-from/create-new-account-from.component';
import {Routes} from '@angular/router';
import { UsersAccountDashboardComponent } from './users-account-dashboard/users-account-dashboard.component';


export const UsersAccountManagementRoutes: Routes = [
    {
        path: '',
        component: UsersAccountDashboardComponent
    },
    {
      path:'create-new-account',
      component:CreateNewAccountFromComponent
    },
    {
      path:'edit/:user_id',
      component:EditUserAccountComponent
    }
];
