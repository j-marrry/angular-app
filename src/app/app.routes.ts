import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { EditPasswordComponent } from './pages/edit-password/edit-password.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent},
    { path: 'login', component: LoginComponent},
    { path: 'edit-password', component: EditPasswordComponent},
    { path: 'users', component: UsersComponent},
    { path: '**', component: PageNotFoundComponent}
];
