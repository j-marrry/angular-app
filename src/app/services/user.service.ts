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

  constructor(private http: HttpClient, private authService: AuthService, private apiService: ApiService) {}

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

  getUserById(userId: number): Observable<User | undefined> {
    return this.apiService.getUserById(userId).pipe(
      map((user: any) => ({
        ...user,
        birthdate: user.birthday,
        middlename: user.patronymic
      }))
    );
  }

 addUser(newUser: User): Observable<User> {
    return this.apiService.addUser(newUser);
  }

    updateUser(updatedUser: User): Observable<User> {
    return this.apiService.updateUser(updatedUser);
  }

    deleteUser(userId: number): Observable<void> {
      return this.apiService.deleteUser(userId);
    }

    checkPassword(userId: number, oldPassword: string): Observable<boolean> {
      return this.apiService.checkPassword(userId, oldPassword);
    }
    
    changePassword(userId: number, newPassword: string): Observable<void> {
      return this.apiService.changePassword(userId, newPassword);
    }
}