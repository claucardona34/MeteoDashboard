import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  standalone: true,
templateUrl:'./ui-card.component.html'
})
export class UiCardComponent {
  @Input() title?: string;
}
