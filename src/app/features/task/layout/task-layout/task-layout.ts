// task-layout.ts

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationService } from '@features/task/navigation/task-navigation.service';
import { taskNavigation } from '@features/task/navigation/task.navigation';
import { TaskHeader } from '../task-header/task-header';
import { TaskSidenav } from '../task-sidenav/task-sidenav';

@Component({
  selector: 'task-layout',
  imports: [TaskHeader, TaskSidenav, RouterOutlet],
  templateUrl: './task-layout.html',
  styleUrl: './task-layout.scss',
})
export class TaskLayout {
  private nav = inject(NavigationService);

  constructor() {
    this.nav.init(taskNavigation);
  }

  items = this.nav.items;
}
