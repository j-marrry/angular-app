import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { LangComponent } from "../lang/lang.component";
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, RouterModule, CommonModule, LangComponent, TranslocoModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user$!: Observable<User | null>;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.user$ = this.authService.currentUser$;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  isAdmin(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser?.roles?.includes('admin');
  }
}
