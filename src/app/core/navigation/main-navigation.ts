// main-navigation.ts

import { Routes } from '@angular/router';
import pagesRoutes from '../../pages/pages.routes';

export const mainNavigation: Routes = [
  {
    path: 'tasks',
    data: {
      navigation: {
        label: 'Tasks',
        path: '/tasks',
        exact: true,
      },
    },
  },
  ...pagesRoutes,
];
