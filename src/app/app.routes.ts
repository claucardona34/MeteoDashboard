import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DetailComponent } from './features/detail/detail.component';
import { cityExistsGuard } from './core/guards/city-exists.guard';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },

  { path: 'detail', component: DetailComponent, canActivate: [cityExistsGuard] },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: '**', redirectTo: '/dashboard' }
];
