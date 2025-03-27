import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
  
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  addUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, newUser);
  }

  updateUser(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${updatedUser.id}`, updatedUser);
  }

  deleteUser(userId: number): Observable<void> {
    console.log(`${this.apiUrl}/users/${userId}`);
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
  }

  checkPassword(userId: number, oldPassword: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/users/${userId}/check-password`, oldPassword);
  }
  
  changePassword(userId: number, newPassword: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/users/${userId}/change-password`, newPassword);
  }  
}
