import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { EditPasswordComponent } from './pages/edit-password/edit-password.component';
import { UsersComponent } from './pages/users/users.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';

export const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'edit-password', component: EditPasswordComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [adminGuard] },
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [adminGuard] },
  { path: 'add-user', component: AddUserComponent, canActivate: [adminGuard] },
  { path: '**', component: PageNotFoundComponent }
];