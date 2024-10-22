import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TokenService } from './token.service';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true },
    { provide: HttpClient, useClass: HttpClient },
    
    
  ]
};
