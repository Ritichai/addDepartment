import {Routes} from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';


export const UserRoutes: Routes = [
    {
        path: 'user-profile',
        component: UserDashboardComponent
    }
];