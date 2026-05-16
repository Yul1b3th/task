// task.mapper.ts

import { Injectable } from '@angular/core';
import { TaskForm, TaskRequest, TaskResponse } from './task.dto';

@Injectable({
  providedIn: 'root',
})
export class TaskMapper {
  responseToForm(dto: TaskResponse): TaskForm {
    return {
      title: dto.title,
      description: dto.description,

      status: dto.status,
      priority: dto.priority,

      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,

      categories: dto.categories.map((category) => category.id),

      acceptedTerms: dto.acceptedTerms,
    };
  }

  formToRequest(form: TaskForm): TaskRequest {
    return {
      title: form.title.trim(),
      description: form.description.trim(),

      status: form.status!,
      priority: form.priority!,

      dueDate: form.dueDate?.toISOString() ?? '',

      categoryIds: form.categories,

      acceptedTerms: form.acceptedTerms,
    };
  }

  responseToRequest(dto: TaskResponse): TaskRequest {
    return {
      title: dto.title,
      description: dto.description,

      status: dto.status,
      priority: dto.priority,

      dueDate: dto.dueDate,

      categoryIds: dto.categories.map((category) => category.id),

      acceptedTerms: dto.acceptedTerms,
    };
  }
}
