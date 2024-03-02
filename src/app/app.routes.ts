import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { UserComponent } from './page/user/user.component';
import { AdminComponent } from './page/admin/admin.component';
import { MainComponent } from './page/main/main.component';
import { ImageComponent } from './page/user/image/image.component';
import { RankComponent } from './page/user/rank/rank.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'image', component: ImageComponent },
    { path: 'rank', component: RankComponent },
];