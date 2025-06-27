/* eslint-disable prettier/prettier */
import { Routes } from '@angular/router';
import { Login } from './component/login/login';
import { Dashboard } from './component/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  {
    path:'landing-page',
    component:Login
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  // Placeholder for notes management route
  // {
  //   path: 'notes',
  //   component: NotesComponent
  // }
];
