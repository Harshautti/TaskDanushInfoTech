import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent, canActivate:[authGuard],
        children:[
            {path:'about',component:AboutComponent}
        ]
    },
    {path:'',redirectTo:'login',pathMatch:'full'},
];
