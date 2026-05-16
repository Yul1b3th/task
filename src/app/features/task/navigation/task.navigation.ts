// task.navigation.ts

import { Routes } from '@angular/router';

export const taskNavigation: Routes = [
  {
    path: 'tasks',
    data: {
      navigation: {
        label: 'Tasks',
        path: '/tasks',
        icon: 'list',
        showInSidebar: true,
      },
    },
  },
  {
    path: 'tasks/new',
    data: {
      navigation: {
        label: 'New Task',
        path: '/tasks/new',
        icon: 'add',
        showInSidebar: true,
      },
    },
  },
];
