// task.store.ts

import { Injectable, signal, computed } from '@angular/core';
import { TaskResponse } from '../task.dto';
import { TaskFilterStatus, TaskSort, TaskStoreState } from '../task.types';

const initialState: TaskStoreState = {
  tasks: [],
  selectedTask: null,

  loading: false,
  error: null,

  filterStatus: 'ALL',
  sortBy: { active: '', direction: '' },
};

@Injectable({ providedIn: 'root' })
export class TaskStore {
  // =====================
  // STATE (signals)
  // =====================
  private readonly state = signal<TaskStoreState>(initialState);

  // =====================
  // SELECTORS
  // =====================
  readonly tasks = computed(() => this.state().tasks);
  readonly selectedTask = computed(() => this.state().selectedTask);

  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  readonly filterStatus = computed(() => this.state().filterStatus);
  readonly sortBy = computed(() => this.state().sortBy);

  // =====================
  // VM (computed UI)
  // =====================
  readonly filteredTasks = computed(() => {
    const { tasks, filterStatus, sortBy } = this.state();

    // 1. Filtrado
    let result = filterStatus === 'ALL' ? tasks : tasks.filter((t) => t.status === filterStatus);

    // 2. Ordenación
    const { active, direction } = sortBy;
    if (!active || !direction) {
      return result;
    }

    return [...result].sort((a, b) => {
      let comparison = 0;

      switch (active) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;

        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;

        case 'priority': {
          const order: Record<'LOW' | 'MEDIUM' | 'HIGH', number> = {
            LOW: 1,
            MEDIUM: 2,
            HIGH: 3,
          };
          comparison = order[a.priority] - order[b.priority];
          break;
        }

        case 'dueDate':
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
      }

      return direction === 'asc' ? comparison : -comparison;
    });
  });

  readonly total = computed(() => this.filteredTasks().length);

  // =====================
  // MUTATORS
  // =====================
  setTasks(tasks: TaskResponse[]) {
    this.state.update((s) => ({ ...s, tasks }));
  }

  setSelectedTask(task: TaskResponse | null) {
    this.state.update((s) => ({ ...s, selectedTask: task }));
  }

  setLoading(loading: boolean) {
    this.state.update((s) => ({ ...s, loading }));
  }

  setError(error: string | null) {
    this.state.update((s) => ({ ...s, error }));
  }

  setFilterStatus(filterStatus: TaskFilterStatus) {
    this.state.update((s) => ({ ...s, filterStatus }));
  }

  setSortBy(sortBy: TaskSort) {
    this.state.update((s) => ({ ...s, sortBy }));
  }

  addTask(task: TaskResponse) {
    this.state.update((s) => ({
      ...s,
      tasks: [task, ...s.tasks],
    }));
  }

  updateTask(task: TaskResponse) {
    this.state.update((s) => ({
      ...s,
      tasks: s.tasks.map((t) => (t.id === task.id ? task : t)),
    }));
  }

  deleteTask(id: number) {
    this.state.update((s) => ({
      ...s,
      tasks: s.tasks.filter((t) => t.id !== id),
    }));
  }

  // =====================
  // RESET
  // =====================
  reset() {
    this.state.set(initialState);
  }

  // =====================
  // SNAPSHOT
  // =====================
  snapshot(): TaskStoreState {
    return this.state();
  }
}
