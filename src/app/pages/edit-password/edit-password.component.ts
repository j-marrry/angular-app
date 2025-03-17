import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { User } from '../../models/user';

@Component({
  selector: 'app-edit-password',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    RouterModule,
    FormsModule,
    MessagesModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.scss',
})
export class EditPasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  currentUser: User | null = null;

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.currentUser = this.authService.getCurrentUser();
  }

  onSaveChanges() {
    if (!this.currentUser) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Ошибка авторизации. Пожалуйста, войдите в систему заново.',
        sticky: true,
      });
      return;
    }

    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Заполните все поля!',
        sticky: true,
      });
      return;
    }

    if (this.oldPassword !== this.currentUser.password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Старый пароль введён неверно!',
        sticky: true,
      });
      return;
    }

    if (this.newPassword.length < 6) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Новый пароль должен содержать минимум 6 символов!',
        sticky: true,
      });
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Пароли не совпадают!',
        sticky: true,
      });
      return;
    }

    const updatedUser = {
      ...this.currentUser,
      password: this.newPassword,
    };

    this.authService.setCurrentUser(updatedUser);
    this.userService.updatePassword(this.currentUser.id, this.newPassword);

    this.messageService.add({
      severity: 'success',
      summary: 'Успех!',
      detail: 'Пароль успешно изменён!',
    });

    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
