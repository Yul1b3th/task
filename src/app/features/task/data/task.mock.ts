// task.mock.ts

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { TaskApi } from './task.api';
import { TaskCategory, TaskRequest, TaskResponse } from '../task.dto';

@Injectable({ providedIn: 'root' })
export class TaskMockService extends TaskApi {
  private idSeq = 3;

  private categories: TaskCategory[] = [
    { id: 1, label: 'Frontend' },
    { id: 2, label: 'Backend' },
    { id: 3, label: 'DevOps' },
  ];

  private tasks: TaskResponse[] = [
    {
      id: 1,
      title: 'Login page',
      description: 'Build login form',
      status: 'PENDING',
      priority: 'HIGH',
      dueDate: new Date().toISOString(),
      categories: [this.categories[0]],
      acceptedTerms: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'API integration',
      description: 'Connect REST API',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      categories: [this.categories[1]],
      acceptedTerms: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Deploy app',
      description: 'Deploy to production',
      status: 'COMPLETED',
      priority: 'LOW',
      dueDate: new Date(Date.now() + 172800000).toISOString(),
      categories: [this.categories[2]],
      acceptedTerms: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  override getTasks(): Observable<TaskResponse[]> {
    return of(this.tasks).pipe(delay(250));
  }

  override getTaskById(id: number): Observable<TaskResponse> {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return throwError(() => new Error('Task not found'));
    return of(task).pipe(delay(250));
  }

  override createTask(dto: TaskRequest): Observable<TaskResponse> {
    const newTask: TaskResponse = {
      id: ++this.idSeq,
      title: dto.title,
      description: dto.description,
      status: dto.status,
      priority: dto.priority,
      dueDate: dto.dueDate,
      categories: this.categories.filter((c) => dto.categoryIds.includes(c.id)),
      acceptedTerms: dto.acceptedTerms,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks = [...this.tasks, newTask];
    return of(newTask).pipe(delay(250));
  }

  override updateTask(id: number, dto: TaskRequest): Observable<TaskResponse> {
    const updated: TaskResponse = {
      id,
      title: dto.title,
      description: dto.description,
      status: dto.status,
      priority: dto.priority,
      dueDate: dto.dueDate,
      categories: this.categories.filter((c) => dto.categoryIds.includes(c.id)),
      acceptedTerms: dto.acceptedTerms,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks = this.tasks.map((t) => (t.id === id ? updated : t));
    return of(updated).pipe(delay(250));
  }

  override deleteTask(id: number): Observable<void> {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return of(void 0).pipe(delay(200));
  }

  override getCategories(): Observable<TaskCategory[]> {
    return of(this.categories).pipe(delay(200));
  }
}
