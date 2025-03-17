import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    MessagesModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: string = '';
  password: string = '';
  users: User[]=[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ){}

  onLogin(){
    if (!this.login || !this.password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка входа',
        detail: 'Заполните все поля',
        sticky: true
      });
      return;
    }

    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        const user = this.users.find(u => u.username === this.login && u.password === this.password);
        if (user) {
          this.authService.setCurrentUser(user);
          this.router.navigate(['/']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка входа',
            detail: 'Неверный логин или пароль',
            sticky: true,
            
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось загрузить данные пользователей'
        });
      }
    });
  }
}
