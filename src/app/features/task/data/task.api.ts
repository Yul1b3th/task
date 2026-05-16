// task.api.ts

import { Observable } from 'rxjs';
import { TaskCategory, TaskRequest, TaskResponse } from '../task.dto';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class TaskApi {
  abstract getTasks(): Observable<TaskResponse[]>;
  abstract getTaskById(id: number): Observable<TaskResponse>;

  abstract createTask(dto: TaskRequest): Observable<TaskResponse>;
  abstract updateTask(id: number, dto: TaskRequest): Observable<TaskResponse>;

  abstract deleteTask(id: number): Observable<void>;

  abstract getCategories(): Observable<TaskCategory[]>;
}
