import { Injectable } from '@angular/core';

interface User {
  username: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];

  constructor() { }

  register(username: string, password: string, email: string): string {
    const userExists = this.users.some(user => user.username === username);
    if (userExists) {
      console.log(`Register failed: Username already exists - ${username}`);
      return 'Username already exists';
    }
    this.users.push({ username, password, email });
    console.log(`User registered: ${username}, Email: ${email}`);
    console.log('Current users:', this.users);
    return 'Registration successful';
  }

  login(username: string, password: string): string {
    console.log(`Attempting login for user: ${username}`);
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
      console.log(`Login successful for user: ${username}`);
      return 'Login successful';
    }
    console.log(`Login failed: Invalid username or password - ${username}`);
    return 'Invalid username or password';
  }
}
