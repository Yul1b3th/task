// task-create.ts

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskFacade } from '@features/task/data/task.facade';
import { TaskApi } from '@features/task/data/task.api';
import { TaskCategory, TaskPriority, TaskStatus } from '@features/task/task.dto';

@Component({
  selector: 'task-create',
  imports: [
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './task-create.html',
  styles: ``,
})
export default class TaskCreate {
  private readonly fb = inject(FormBuilder);
  private readonly facade = inject(TaskFacade);
  private readonly router = inject(Router);
  private readonly api = inject(TaskApi);

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

    this.facade.createTask(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
    });
  }
}
