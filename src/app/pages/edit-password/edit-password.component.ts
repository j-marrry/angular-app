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
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

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
    CommonModule,
    TranslocoModule
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
    private authService: AuthService,
    private translocoService: TranslocoService
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
        summary: this.translocoService.translate('msgError'),
        detail: this.translocoService.translate('msgAuth'),
        sticky: true,
      });
      return;
    }

    if (this.oldPassword !== this.currentUser.password) {
      this.messageService.add({
        severity: 'error',
        summary: this.translocoService.translate('msgError'),
        detail: this.translocoService.translate('msgOldPassword'),
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
      summary: this.translocoService.translate('msgSuccess'),
      detail: this.translocoService.translate('msgPasswordChange'),
    });

    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordMismatch = false;
  }
}
