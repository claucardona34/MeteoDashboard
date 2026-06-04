import { Component, inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { WeatherService } from '../../core/services/weather.service';
import { UiCardComponent } from '../../shared/components/ui-card.component';
import { LoaderComponent } from '../../shared/components/loader.component';
import { DecimalPipe } from '@angular/common';
import { WeatherIconComponent } from "../../shared/components/weather-icon/weather-icon.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SearchBarComponent,
    HistoryListComponent,
    UiCardComponent,
    LoaderComponent,
    DecimalPipe,
    RouterLink,
    WeatherIconComponent
],
templateUrl:'./dashboard.component.html'
})
export class DashboardComponent {
  public weatherService = inject(WeatherService);

  ngOnDestroy() {
    this.weatherService.stopPolling();
  }
}
