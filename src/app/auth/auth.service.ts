import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  username: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL del backend

  constructor(private http: HttpClient) {}

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password, email });
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }
  confirmAccount(email: string, code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/confirm`, { email, code });
  }

}