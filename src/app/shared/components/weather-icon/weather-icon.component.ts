import { Component, input } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  templateUrl: './weather-icon.component.html'
})
export class WeatherIconComponent {
  condition = input.required<string>();
}
