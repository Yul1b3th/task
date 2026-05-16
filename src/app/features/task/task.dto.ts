// task.dto.ts

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface TaskCategory {
  id: number;
  label: string;
}

export interface TaskResponse {
  id: number;

  title: string;
  description: string;

  status: TaskStatus;
  priority: TaskPriority;

  dueDate: string;

  categories: TaskCategory[];

  acceptedTerms: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface TaskRequest {
  title: string;
  description: string;

  status: TaskStatus;
  priority: TaskPriority;

  dueDate: string;

  categoryIds: number[];

  acceptedTerms: boolean;
}

export interface TaskForm {
  title: string;
  description: string;

  status?: TaskStatus;
  priority?: TaskPriority;

  dueDate: Date | null;

  categories: number[];

  acceptedTerms: boolean;
}
