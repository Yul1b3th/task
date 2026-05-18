// app.routes.ts

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes'),
  },
  {
    path: 'tasks',
    loadChildren: () => import('./features/task/task.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.routes'),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found'),
  },
];
