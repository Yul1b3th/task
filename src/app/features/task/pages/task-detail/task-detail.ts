import { Component, inject, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TaskFacade } from '@features/task/data/task.facade';

@Component({
  selector: 'task-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './task-detail.html',
})
export default class TaskDetail {
  private readonly facade = inject(TaskFacade);

  // Recibe el ID de la ruta de forma reactiva
  readonly id = input.required<string>();

  // Inicializamos el recurso pasándole la lectura limpia de la señal id
  private readonly taskResource = this.facade.getTaskResource(() => Number(this.id()));

  // Exponemos las señales puras del recurso hacia el template
  readonly task = computed(() => this.taskResource.value() ?? null);
  readonly loading = computed(() => this.taskResource.isLoading());
}
