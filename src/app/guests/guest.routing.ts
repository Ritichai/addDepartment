import {Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';

export const GuestRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
];