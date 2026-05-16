// task.http.ts

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskApi } from './task.api';
import { Observable } from 'rxjs';
import { TaskCategory, TaskRequest, TaskResponse } from '../task.dto';

@Injectable({ providedIn: 'root' })
export class TaskHttpService extends TaskApi {
  private readonly http = inject(HttpClient);
  private readonly API = '/api';
  private readonly TASKS = `${this.API}/tasks`;

  override getTasks(): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(this.TASKS);
  }

  override getTaskById(id: number): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.TASKS}/${id}`);
  }

  override createTask(dto: TaskRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.TASKS, dto);
  }

  override updateTask(id: number, dto: TaskRequest): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.TASKS}/${id}`, dto);
  }

  override deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.TASKS}/${id}`);
  }

  override getCategories(): Observable<TaskCategory[]> {
    return this.http.get<TaskCategory[]>(`${this.TASKS}/categories`);
  }
}
