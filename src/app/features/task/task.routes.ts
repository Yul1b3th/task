// task.routes.ts

import { Routes } from '@angular/router';
import { TaskApi } from './data/task.api';
import { TaskMockService } from './data/task.mock';
import { TaskFacade } from './data/task.facade';
import { TaskLayout } from './layout/task-layout/task-layout';

export const taskRoutes: Routes = [
  {
    path: '',
    component: TaskLayout,
    providers: [
      TaskFacade,
      {
        provide: TaskApi,
        useClass: TaskMockService,
      },
    ],

    children: [
      {
        path: '',
        loadComponent: () => import('./pages/task-list/task-list'),
        data: {
          navigation: {
            label: 'List',
            icon: 'list',
            path: '/tasks',
            visible: true,
          },
        },
      },

      {
        path: 'new',
        loadComponent: () => import('./pages/task-create/task-create'),
        data: {
          navigation: {
            label: 'New Task',
            icon: 'add',
            path: '/tasks/new',
            visible: true,
          },
        },
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./pages/task-edit/task-edit'),
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/task-detail/task-detail'),
      },
    ],
  },
];

export default taskRoutes;
