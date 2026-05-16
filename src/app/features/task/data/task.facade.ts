// task.facade.ts

import { Injectable, inject } from '@angular/core';
import { TaskApi } from './task.api';
import { TaskStore } from './task.store';
import { TaskForm, TaskRequest, TaskResponse } from '../task.dto';
import { finalize, tap } from 'rxjs';
import { TaskMapper } from '../task.mapper';
import { TaskFilterStatus, TaskSort } from '../task.types';

@Injectable()
export class TaskFacade {
  private readonly api = inject(TaskApi);
  private readonly store = inject(TaskStore);
  private readonly mapper = inject(TaskMapper);

  // =====================
  // SELECTORS UI
  // =====================
  readonly tasks = this.store.filteredTasks;
  readonly selectedTask = this.store.selectedTask;
  readonly loading = this.store.loading;
  readonly error = this.store.error;
  readonly total = this.store.total;

  // =====================
  // LOAD ALL
  // =====================
  loadTasks() {
    this.store.setLoading(true);
    this.store.setError(null);

    return this.api.getTasks().pipe(
      tap((tasks) => this.store.setTasks(tasks)),
      finalize(() => this.store.setLoading(false)),
    );
  }

  // =====================
  // SELECT ONE
  // =====================
  loadTaskById(id: number) {
    this.store.setLoading(true);

    return this.api.getTaskById(id).pipe(
      tap((task) => this.store.setSelectedTask(task)),
      finalize(() => this.store.setLoading(false)),
    );
  }

  // =====================
  // CREATE
  // =====================
  createTask(form: TaskForm) {
    const dto: TaskRequest = this.mapper.formToRequest(form);

    this.store.setLoading(true);

    return this.api.createTask(dto).pipe(
      tap((task) => this.store.addTask(task)),
      finalize(() => this.store.setLoading(false)),
    );
  }

  // =====================
  // UPDATE
  // =====================
  updateTask(id: number, form: TaskForm) {
    const dto = this.mapper.formToRequest(form);

    this.store.setLoading(true);

    return this.api.updateTask(id, dto).pipe(
      tap((task) => this.store.updateTask(task)),
      finalize(() => this.store.setLoading(false)),
    );
  }

  // =====================
  // DELETE
  // =====================
  deleteTask(id: number) {
    this.store.setLoading(true);

    return this.api.deleteTask(id).pipe(
      tap(() => this.store.deleteTask(id)),
      finalize(() => this.store.setLoading(false)),
    );
  }

  // =====================
  // FILTER / UI
  // =====================
  setFilter(status: TaskFilterStatus) {
    this.store.setFilterStatus(status);
  }

  reset() {
    this.store.reset();
  }

  setSort(sort: TaskSort) {
    this.store.setSortBy(sort);
  }
}
