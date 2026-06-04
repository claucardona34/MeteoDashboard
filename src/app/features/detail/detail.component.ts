import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WeatherService } from '../../core/services/weather.service';
import { UiCardComponent } from '../../shared/components/ui-card.component';
import { WeatherIconComponent } from "../../shared/components/weather-icon/weather-icon.component";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [UiCardComponent, RouterLink, WeatherIconComponent],
  templateUrl:'detail.component.html'

})
export class DetailComponent {
  public weatherService = inject(WeatherService);
}
