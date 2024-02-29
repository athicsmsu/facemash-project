import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { UserComponent } from './page/user/user.component';
import { AdminComponent } from './page/admin/admin.component';
import { MainComponent } from './page/main/main.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent },
    { path: 'admin', component: AdminComponent }
];