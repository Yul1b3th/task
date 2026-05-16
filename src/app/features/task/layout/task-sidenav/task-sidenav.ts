// task-sidenav.ts

import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NavigationService } from '@features/task/navigation/task-navigation.service';

@Component({
  selector: 'app-task-sidenav',
  imports: [RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './task-sidenav.html',
  styleUrl: './task-sidenav.scss',
})
export class TaskSidenav {
  private nav = inject(NavigationService);

  items = this.nav.items;
}
