// app.routes.ts

import { Routes } from '@angular/router';
import { MainLayout } from '@core/layout/main-layout/main-layout';
import { TaskLayout } from '@features/task/layout/task-layout/task-layout';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes'),
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/pages.routes'),
      },
    ],
  },
  {
    path: 'tasks',
    component: TaskLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/task/task.routes'),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found'),
  },
];
