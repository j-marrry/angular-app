import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = this.getCurrentUser();
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(this.user);

  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {}

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  setAllUsers(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }
}