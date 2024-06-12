import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    console.log(`Registrando usuario: ${this.username}`);
    const message = this.authService.register(this.username, this.password, this.email);
    if (message === 'Registro Exitoso') {
      this.successMessage = message;
      this.errorMessage = '';
      console.log(`Registro Exitoso para el usuario: ${this.username}`);
    } else {
      this.errorMessage = message;
      this.successMessage = '';
      console.log(`Detalles del Registro: ${message}`);
    }
  }
}
