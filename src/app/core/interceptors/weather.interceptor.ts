import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';

export const weatherInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('openweathermap.org')) {
    const clonedReq = req.clone({
      setParams: {
        appid: environment.openWeatherApiKey,
        units: 'metric',
        lang: 'es'
      }
    });

    return next(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error desconocido';

        if (error.status === 404) {
          errorMessage = 'Ciudad no encontrada. Verifica el nombre.';
        } else if (error.status === 401) {
          errorMessage = 'Error de autenticación: API Key inválida.';
        } else if (error.status === 429) {
          errorMessage = 'Demasiadas peticiones. Intenta más tarde.';
        }

        console.warn('⚠️ [Interceptor] Error capturado:', errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
  }
  return next(req);
};
