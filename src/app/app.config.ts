import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { weatherInterceptor } from './core/interceptors/weather.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Registro del HttpClient con el interceptor funcional de OpenWeather
    provideHttpClient(withInterceptors([weatherInterceptor]))
  ]
};
