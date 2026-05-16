import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home'),
    data: {
      navigation: {
        label: 'Home',
        path: '/',
        exact: true,
      },
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about'),
    data: {
      navigation: {
        label: 'About',
        path: '/about',
      },
    },
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact'),
    data: {
      navigation: {
        label: 'Contact',
        path: '/contact',
      },
    },
  },
];

export default pagesRoutes;
