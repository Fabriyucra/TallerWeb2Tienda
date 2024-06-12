import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  email: string = '';
  code: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  onSubmit() {
    this.authService.confirmAccount(this.email, this.code).subscribe({
      next: (response) => {
        this.successMessage = 'Cuenta confirmada exitosamente';
        this.errorMessage = '';
        this.router.navigate(['/confirm']);
        console.log('Confirmación exitosa:', response);
      },
      error: (error) => {
        this.errorMessage = 'Error en la confirmación de la cuenta';
        this.successMessage = '';
        console.error('Error en la confirmación de la cuenta:', error);
      }
    });
  }
}
