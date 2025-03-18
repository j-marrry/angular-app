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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-password',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    RouterModule,
    FormsModule,
    MessagesModule,
    ToastModule,
    CommonModule
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
  passwordMismatch: boolean = false;

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

  checkPasswords() {
    this.passwordMismatch = this.newPassword !== this.confirmPassword;
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

    if (this.oldPassword !== this.currentUser.password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Старый пароль введён неверно!',
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
    this.passwordMismatch = false;
  }
}
