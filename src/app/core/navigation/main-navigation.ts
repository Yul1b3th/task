import { Routes } from '@angular/router';
import pagesRoutes from '../../pages/pages.routes';

export const mainNavigation: Routes = [
  ...pagesRoutes,
  {
    path: 'tasks',
    data: {
      navigation: {
        label: 'Tasks',
        path: '/tasks',
        exact: false,
      },
    },
  },
];
