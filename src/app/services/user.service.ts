import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'assets/data/users.json';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.initializeUsers();
  }

  private initializeUsers(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      this.http.get(this.usersUrl).subscribe((data: any) => {
        const userList = data.userList || [];
        this.authService.setAllUsers(userList);
        localStorage.setItem('users', JSON.stringify(userList));
      });
    }
  }

  getAllUsers(): Observable<User[]> {
    const users = this.authService.getAllUsers();
    return new Observable((observer) => {
      observer.next(users);
      observer.complete();
    });
  }

  getUserById(userId: number): Observable<User | undefined> {
    return this.getAllUsers().pipe(
      map((users: User[]) => users.find((user) => user.id === userId))
    );
  }

  addUser(newUser: User): void {
    const users = this.authService.getAllUsers();
    users.push(newUser);
    this.authService.setAllUsers(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  updateUser(updatedUser: User): void {
    const users = this.authService.getAllUsers();
    const index = users.findIndex((user: User) => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      this.authService.setAllUsers(users);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  deleteUser(userId: number): void {
    let users = this.authService.getAllUsers();
    users = users.filter((user: User) => user.id !== userId);
    this.authService.setAllUsers(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  updatePassword(userId: number, newPassword: string): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((user: User) => user.id === userId);
  
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
}