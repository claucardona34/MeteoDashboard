import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { WeatherService } from '../services/weather.service';

export const cityExistsGuard: CanActivateFn = (route, state) => {
  const weatherService = inject(WeatherService);
  const router = inject(Router);

  if (!weatherService.currentWeather()) {
    return router.parseUrl('/dashboard');
  }
  return true;
};
