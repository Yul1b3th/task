// task-navigation.service.ts

import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { signal, computed } from '@angular/core';
import { NavigationItem } from './task-navigation.types';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private navItems = signal<NavigationItem[]>([]);

  readonly items = computed(() => this.navItems());

  init(routes: Routes) {
    const items: NavigationItem[] = [];

    const extract = (routes: Routes) => {
      for (const route of routes) {
        const nav = route.data?.['navigation'];

        if (nav && nav.visible !== false) {
          items.push({
            label: nav.label,
            path: nav.path,
            icon: nav.icon,
            exact: nav.exact ?? false,
          });
        }

        if (route.children) {
          extract(route.children);
        }
      }
    };

    extract(routes);
    this.navItems.set(items);
  }
}
