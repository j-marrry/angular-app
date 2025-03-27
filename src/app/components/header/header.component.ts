import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { LangComponent } from "../lang/lang.component";
import { TranslocoModule } from '@jsverse/transloco';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, RouterModule, CommonModule, LangComponent, TranslocoModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user$!: Observable<User | null>;
  username: string | null = null;
  isAdmin: boolean = false;

  constructor(private router: Router, private tokenStorage: TokenStorageService) {
  }
  
  ngOnInit(): void {
    const currentUser = this.tokenStorage.getUser();
    if (currentUser) {
      this.username = currentUser.username;
      this.isAdmin = currentUser.roles && currentUser.roles.some((role: any) => role.authority === 'ROLE_ADMIN');
    }
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }
}
