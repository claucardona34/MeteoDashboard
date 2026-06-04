import { Component, inject } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-history-list',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl:'./history-list.component.html'
})
export class HistoryListComponent {
  public weatherService = inject(WeatherService);

  searchAgain(cityName: string) {
    this.weatherService.searchCity(cityName);
  }
}
