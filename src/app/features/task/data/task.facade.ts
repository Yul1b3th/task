import { Injectable, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { finalize, of, tap } from 'rxjs';

import { TaskApi } from './task.api';
import { TaskStore } from './task.store';
import { TaskForm, TaskRequest } from '../task.dto';
import { TaskMapper } from '../task.mapper';
import { TaskFilterStatus, TaskSort } from '../task.types';

@Injectable()
export class TaskFacade {
  private readonly api = inject(TaskApi);
  private readonly store = inject(TaskStore);
  private readonly mapper = inject(TaskMapper);

  // =====================
  // SELECTORES DE UI GENERALES
  // =====================
  readonly tasks = this.store.filteredTasks;
  readonly loading = this.store.loading;
  readonly error = this.store.error;
  readonly total = this.store.total;

  // =====================
  // MOTOR REACTIVO PARA UN DETALLE (rxResource)
  // =====================
  /**
   * Fábrica declarativa que genera un recurso reactivo enlazado a la petición HTTP.
   * Maneja de forma interna e independiente su propio estado de carga (isLoading).
   *
   * @param idFn Función anónima proporcionada por el componente que retorna el ID actual de forma reactiva.
   */
  getTaskResource(idFn: () => number) {
    return rxResource({
      params: () => ({ id: idFn() }),
      stream: ({ params }) => {
        // Validación de seguridad para IDs nulos o incorrectos
        if (params.id === null || isNaN(params.id)) return of(null);

        // Opcional: Sincronizamos con el store global que comenzó una carga general
        this.store.setLoading(true);

        return this.api.getTaskById(params.id).pipe(
          tap({
            next: (task) => this.store.setSelectedTask(task),
            error: (err) => {
              this.store.setError(err.message || 'Error loading task');
              this.store.setSelectedTask(null);
            },
            finalize: () => this.store.setLoading(false),
          }),
        );
      },
    });
  }

  // =====================
  // OPERACIONES CRUD IMPERATIVAS
  // =====================

  // LOAD ALL
  loadTasks() {
    this.store.setLoading(true);
    this.store.setError(null);

    return this.api.getTasks().pipe(
      tap((tasks) => this.store.setTasks(tasks)),
      finalize(() => this.store.setLoading(false)),
    );
  }

  // CREATE
  createTask(form: TaskForm) {
    const dto: TaskRequest = this.mapper.formToRequest(form);
    this.store.setLoading(true);

    return this.api.createTask(dto).pipe(
      tap((task) => this.store.addTask(task)),
      finalize(() => this.store.setLoading(false)),
    );
  }

  // UPDATE
  updateTask(id: number, form: TaskForm) {
    const dto = this.mapper.formToRequest(form);
    this.store.setLoading(true);

    return this.api.updateTask(id, dto).pipe(
      tap((task) => this.store.updateTask(task)),
      finalize(() => this.store.setLoading(false)),
    );
  }

  // DELETE
  deleteTask(id: number) {
    this.store.setLoading(true);

    return this.api.deleteTask(id).pipe(
      tap(() => this.store.deleteTask(id)),
      finalize(() => this.store.setLoading(false)),
    );
  }

  // =====================
  // FILTRADO / ORDENACIÓN (ESTADO UI)
  // =====================
  setFilter(status: TaskFilterStatus) {
    this.store.setFilterStatus(status);
  }

  setSort(sort: TaskSort) {
    this.store.setSortBy(sort);
  }

  reset() {
    this.store.reset();
  }
}
