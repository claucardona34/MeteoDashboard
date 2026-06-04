import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WeatherService } from '../../../core/services/weather.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
 templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  searchControl = new FormControl('');
  private weatherService = inject(WeatherService);

  constructor() {
    this.searchControl.valueChanges.pipe(
      takeUntilDestroyed(),
      filter(value => value !== null && value.trim().length > 2),
      debounceTime(600),
      distinctUntilChanged()
    ).subscribe(city => {
      if (city) {
        this.weatherService.searchCity(city.trim());
      }
    });
  }

  clearSearch() {
    this.searchControl.setValue('');
  }
}
