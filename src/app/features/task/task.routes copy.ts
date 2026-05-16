import { Routes } from '@angular/router';
import { TaskLayout } from './layout/task-layout/task-layout';

export const taskRoutes: Routes = [
  {
    path: '',
    component: TaskLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/task-list/task-list'),
      },
      {
        path: 'new',
        loadComponent: () => import('./pages/task-create/task-create'),
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/task-detail/task-detail'),
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./pages/task-edit/task-edit'),
      },
    ],
  },
];

export default taskRoutes;
