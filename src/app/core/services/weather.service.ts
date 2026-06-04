import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, Subscription, Subject, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

export interface WeatherData {
  name: string;
  main: { temp: number; temp_max: number; temp_min: number; humidity: number; pressure: number };
  wind: { speed: number };
  weather: [{ description: string; icon: string; main: string }];
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  public currentWeather = signal<WeatherData | null>(null);
  public searchHistory = signal<WeatherData[]>([]);
  public isLoading = signal<boolean>(false);
  public errorMessage = signal<string | null>(null);

  private pollingSubscription?: Subscription;
  private currentCitySearch = new Subject<string>();

  constructor(private http: HttpClient) {
    this.currentCitySearch.pipe(
      switchMap(city => timer(0, 45000).pipe(
        switchMap(() => this.fetchWeather(city))
      ))
    ).subscribe(data => {
      if(data) {
        this.updateState(data);
      }
    });
  }

  searchCity(city: string) {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.currentCitySearch.next(city);
  }


  private fetchWeather(city: string): Observable<WeatherData | null> {
    return this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city}`).pipe(
      catchError(err => {
        this.isLoading.set(false);
        this.currentWeather.set(null);

        if (err.status === 404) {
          this.errorMessage.set(`No pudimos encontrar la ciudad "${city}". Verifica el nombre e intenta de nuevo.`);
        } else {
          this.errorMessage.set('Hubo un problema de conexión con el servidor meteorológico.');
        }

        return of(null);
      })
    );
  }

  private updateState(data: WeatherData) {
    this.currentWeather.set(data);
    this.isLoading.set(false);
    this.errorMessage.set(null);

    this.searchHistory.update(history => {
      const filtered = history.filter(h => h.name.toLowerCase() !== data.name.toLowerCase());
      return [data, ...filtered].slice(0, 5);
    });
  }

  stopPolling() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
