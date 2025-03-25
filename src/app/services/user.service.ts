import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'assets/data/users.json';

  constructor(private http: HttpClient, private authService: AuthService, private apiService: ApiService) {
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
    return this.apiService.getUsers().pipe(
      map((users: any[]) =>
        users.map(user => ({
          ...user,
          birthdate: user.birthday
        }))
      )
    );
  }

  /*getUserById(userId: number): Observable<User | undefined> {
    return this.getAllUsers().pipe(
      map((users: User[]) => users.find((user) => user.id === userId))
    );
  }*/

  getUserById(userId: number): Observable<User | undefined> {
    return this.apiService.getUserById(userId).pipe(
      map((user: any) => ({
        ...user,
        birthdate: user.birthday,
        middlename: user.patronymic
      }))
    );
  }

  /*addUser(newUser: User): void {
    const users = this.authService.getAllUsers();
    users.push(newUser);
    this.authService.setAllUsers(users);
    localStorage.setItem('users', JSON.stringify(users));
  }*/
 addUser(newUser: User): Observable<User> {
    return this.apiService.addUser(newUser);
  }

  /*updateUser(updatedUser: User): void {
    const users = this.authService.getAllUsers();
    const index = users.findIndex((user: User) => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      this.authService.setAllUsers(users);
      localStorage.setItem('users', JSON.stringify(users));
      const currentUser = this.authService.getCurrentUser();
      if(currentUser && currentUser.id == updatedUser.id){
        this.authService.setCurrentUser(updatedUser);
      }
    }
  }*/

    updateUser(updatedUser: User): Observable<User> {
    return this.apiService.updateUser(updatedUser);
  }

  /*deleteUser(userId: number): void {
    let users = this.authService.getAllUsers();
    users = users.filter((user: User) => user.id !== userId);
    this.authService.setAllUsers(users);
    localStorage.setItem('users', JSON.stringify(users));
  }*/

    deleteUser(userId: number): Observable<void> {
      return this.apiService.deleteUser(userId);
    }

  /*updatePassword(userId: number, newPassword: string): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((user: User) => user.id === userId);
  
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }*/

    checkPassword(userId: number, oldPassword: string): Observable<boolean> {
      return this.apiService.checkPassword(userId, oldPassword);
    }
    
    changePassword(userId: number, newPassword: string): Observable<void> {
      return this.apiService.changePassword(userId, newPassword);
    }
}