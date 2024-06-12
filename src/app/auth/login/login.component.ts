import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    console.log(`Logging in user: ${this.email}`);
    const message = this.authService.login(this.email, this.password);
    if (message === 'Login successful') {
      this.successMessage = message;
      this.errorMessage = '';
      console.log(`Login successful for user: ${this.email}`);
    } else {
      this.errorMessage = message;
      this.successMessage = '';
      console.log(`Login failed: ${message}`);
    }
  }
}
