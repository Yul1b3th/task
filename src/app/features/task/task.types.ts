// task.types.ts

import { TaskResponse } from './task.dto';

/**
 * =========================
 *  DOMAIN TYPES (UI LAYER)
 * =========================
 */

export type TaskViewMode = 'list' | 'detail' | 'create' | 'edit';

export type TaskFilterStatus = 'ALL' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export type SortDirection = 'asc' | 'desc' | '';

export interface TaskSort {
  active: 'title' | 'status' | 'priority' | 'dueDate' | '';
  direction: SortDirection;
}

/**
 * =========================
 *  STORE STATE STRUCTURE
 * =========================
 */

export interface TaskStoreState {
  tasks: TaskResponse[];
  selectedTask: TaskResponse | null;

  loading: boolean;
  error: string | null;

  filterStatus: TaskFilterStatus;
  sortBy: TaskSort;
}
