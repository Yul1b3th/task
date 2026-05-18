// pages.routes.ts

import { Routes } from '@angular/router';
import { MainLayout } from '@core/layout/main-layout/main-layout';

export const pagesRoutes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
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
            visible: true,
          },
        },
      },
      {
        path: 'legal-notice',
        loadComponent: () => import('./legal-notice/legal-notice'),
        data: {
          navigation: {
            label: 'Legal Notice',
            path: '/legal-notice',
            visible: false,
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
    ],
  },
];

export default pagesRoutes;
