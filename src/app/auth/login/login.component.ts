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
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.successMessage = 'Inicio de sesión exitoso';
        this.errorMessage = '';
        console.log('Inicio de sesión exitoso:', response);
      },
      error: (error) => {
        this.errorMessage = 'Error al iniciar sesión';
        this.successMessage = '';
        console.error('Error al iniciar sesión:', error);
      }
    });
    
  }
}
