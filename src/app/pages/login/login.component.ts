import { Component, OnInit } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { TokenStorageService } from '../../services/token-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    MessagesModule,
    ToastModule,
    TranslocoModule,
    CommonModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    login: string = '';
    password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private translocoService: TranslocoService,
    private tokenStorage: TokenStorageService
  ){}

  onLogin(){

    if (!this.login || !this.password) {
      this.messageService.add({
        severity: 'error',
        summary: this.translocoService.translate('msgError'),
        detail: this.translocoService.translate('msgFill'),
        sticky: true
      });
      return;
    }

    this.authService.login(this.login, this.password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.user);

        this.router.navigate(['/']);
      },
      error: err => {
        this.messageService.add({
            severity: 'error',
            summary: this.translocoService.translate('msgError'),
            detail: this.translocoService.translate('msgInvalidCredentials'),
            sticky: true
        });
    }
    });
  }
}
