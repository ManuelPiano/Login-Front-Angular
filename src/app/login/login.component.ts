import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, SweetAlert2Module],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoading: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    localStorage.removeItem('token');
    setTimeout(() => {
      this.isLoading = false;
    }, 3000); // Cambia esto al tiempo que necesites para cargar los datos
  }

  async onSubmit() {
    if (this.username === '' || this.password === '') {
      console.log('Username and password are required');
      return;
    }
    localStorage.setItem('username', this.username);
    (await this.authService.login(this.username, this.password)).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Credenciales incorrectas');
          // Aquí puedes mostrar un mensaje de error al usuario usando SweetAlert2 o cualquier otra librería
          Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
          });
        } else {
          console.error('Error desconocido:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error desconocido. Por favor, inténtalo de nuevo más tarde.',
          });
        }
        return of(null); // Retorna un observable vacío para que el flujo continúe
      })
    ).subscribe((data: any) => {
      if (data && data['token']) {
        localStorage.setItem('token', data['token']);
        console.log('Login successful');
        // Redirigir al usuario a la página principal o a otra página
        this.router.navigate(['/home']);
      } else {
        console.log('Login failed');
      }
    });
  }
}