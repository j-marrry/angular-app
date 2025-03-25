import { Component, Inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TableModule } from 'primeng/table';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco'
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [HeaderComponent, TableModule, HttpClientModule, ButtonModule, TranslocoModule],
  providers: [UserService, DatePipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users: User[] = [];
  constructor(private userService: UserService, private router: Router, private datePipe: DatePipe) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
    });
  }

  editUser(id: number) {
    this.router.navigate(['/edit-user', id]);
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }

  formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'dd.MM.yyyy');
  }

  deleteUser(id: number){
    this.userService.deleteUser(id).pipe(
      switchMap(() => this.userService.getAllUsers())
    ).subscribe({
      next: (users: User[]) => {
        this.users = users;
      }
    });
  }
}
