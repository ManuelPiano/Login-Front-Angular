import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  token: string = '';
  username: any;

  constructor(private router: Router, private authService: AuthService) {}
  async ngOnInit(): Promise<void> {
    let token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    if (token) {
      this.token = token;
      console.log('Token found:', token);
      await this.verificarToken(token);
    } else {
      console.error('No token found');
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  verificarToken(token: string) {
    console.log('Verifying token:', token);
    if (token) {
      this.authService.authorize(token).subscribe((data: any) => {
        console.log('Authorization data:', data);
      });
    }
  }
}
