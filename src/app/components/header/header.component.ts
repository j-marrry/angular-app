import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user$!: Observable<User | null>;
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit(): void{
    this.user$ = this.authService.currentUser$;
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
