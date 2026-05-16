// task-list.component.ts

import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { TaskFacade } from '@features/task/data/task.facade';
import { TaskFilterStatus, TaskSort } from '@features/task/task.types';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [RouterLink, DatePipe, MatTableModule, MatButtonModule, MatSortModule],
  templateUrl: './task-list.html',
})
export default class TaskList implements OnInit {
  private readonly facade = inject(TaskFacade);

  readonly tasks = this.facade.tasks;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;

  readonly displayedColumns = ['title', 'status', 'priority', 'dueDate', 'actions'];

  // Usamos un setter para interceptar el momento exacto en que la tabla se dibuja en el DOM
  @ViewChild(MatSort) set matSort(sort: MatSort | undefined) {
    if (sort) {
      // Nos desuscribimos de eventos previos si existieran para evitar memory leaks
      sort.sortChange.observers = [];

      sort.sortChange.subscribe((event: Sort) => {
        this.facade.setSort({
          active: event.active,
          direction: event.direction,
        } as TaskSort);
      });
    }
  }

  ngOnInit(): void {
    this.facade.loadTasks().subscribe();
  }

  deleteTask(id: number) {
    const ok = confirm('¿Eliminar tarea?');
    if (!ok) return;
    this.facade.deleteTask(id).subscribe();
  }

  filterBy(status: TaskFilterStatus) {
    this.facade.setFilter(status);
  }
}
