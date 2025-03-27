import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService){}

  login(username: string, password: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/login`,{
      username,
      password
    });
  }

  logout(): void {
    this.tokenStorageService.signOut();
  }
}