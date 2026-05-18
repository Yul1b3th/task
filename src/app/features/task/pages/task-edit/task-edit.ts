// task-edit.ts

import { Component, computed, inject, input, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { TaskFacade } from '@features/task/data/task.facade';
import { TaskApi } from '@features/task/data/task.api';

import { TaskCategory, TaskPriority, TaskStatus } from '@features/task/task.dto';

@Component({
  selector: 'task-edit',
  imports: [
    RouterLink,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './task-edit.html',
})
export default class TaskEdit {
  private readonly fb = inject(FormBuilder);
  private readonly facade = inject(TaskFacade);
  private readonly api = inject(TaskApi);
  private readonly router = inject(Router);

  readonly id = input.required<string>();

  private readonly taskResource = this.facade.getTaskResource(() => Number(this.id()));

  readonly task = computed(() => this.taskResource.value());
  readonly loading = computed(() => this.taskResource.isLoading());

  categories: TaskCategory[] = [];

  readonly statuses: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

  readonly priorities: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH'];

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],

    description: ['', [Validators.required, Validators.minLength(5)]],

    status: ['PENDING' as TaskStatus, Validators.required],

    priority: ['MEDIUM' as TaskPriority, Validators.required],

    dueDate: [null as Date | null, Validators.required],

    categories: [[] as number[]],

    acceptedTerms: [false, Validators.requiredTrue],
  });

  constructor() {
    this.loadCategories();

    effect(() => {
      const task = this.task();

      if (!task) return;

      this.form.patchValue({
        title: task.title,
        description: task.description,

        status: task.status,
        priority: task.priority,

        dueDate: task.dueDate ? new Date(task.dueDate) : null,

        categories: task.categories.map((c) => c.id),

        acceptedTerms: task.acceptedTerms,
      });
    });
  }

  private loadCategories() {
    this.api.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.facade.updateTask(Number(this.id()), this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
    });
  }
}
