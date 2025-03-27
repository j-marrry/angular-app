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
import { TokenStorageService } from '../../services/token-storage.service';

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
    private translocoService: TranslocoService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.currentUser = this.tokenStorageService.getUser();
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

    this.userService.checkPassword(this.currentUser.id, this.oldPassword).subscribe(isValid => {
      if (!isValid) {
        this.messageService.add({
          severity: 'error',
          summary: this.translocoService.translate('msgError'),
          detail: this.translocoService.translate('msgOldPassword'),
          sticky: true,
        });
        return;
      }
      if(this.currentUser?.id)
      this.userService.changePassword(this.currentUser.id, this.newPassword).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: this.translocoService.translate('msgSuccess'),
          detail: this.translocoService.translate('msgPasswordChange'),
        });
        this.passwordMismatch = false;
        return;
  });
});
}
}
