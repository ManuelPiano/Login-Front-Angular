import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/';
  private tokenBearer: string = '';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.url + "auth/login", { username, password });
  }

  authorize(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Authorization Header:', headers.get('Authorization')); // Agrega un log para verificar
    return this.http.get(this.url + "v1/home", { headers });
  }
}