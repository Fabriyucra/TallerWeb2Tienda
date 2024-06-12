import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService,private router: Router) {}

  onSubmit() {
    this.authService.register(this.username, this.password, this.email).subscribe({
      next: (response) => {
        this.successMessage = 'Registro exitoso';
        this.errorMessage = '';
        console.log('Registro exitoso:', response);
        this.router.navigate(['/confirm']);
        console.log('Ir a validar registro:', response);
      },
      error: (error) => {
        this.errorMessage = 'Error en el registro';
        this.successMessage = '';
        console.error('Error en el registro:', error);
      }
    });
    
  }
}
