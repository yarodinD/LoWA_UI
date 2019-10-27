import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { GbgComponent } from './gbg/gbg.component';

const fallbackRoutes: Routes = [
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'gbg', component: GbgComponent }
];

export const appRoutes = [...routes, ...fallbackRoutes];
