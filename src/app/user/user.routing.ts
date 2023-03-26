import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {Routes} from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';


export const UserRoutes: Routes = [
    {
        path: 'user-profile',
        component: UserDashboardComponent
    },
    {
        path: 'edit-profile/:username',
        component: EditProfileComponent
    }
];
