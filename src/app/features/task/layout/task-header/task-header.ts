import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-header',
  imports: [RouterLink, MatIcon],
  templateUrl: './task-header.html',
  styleUrl: './task-header.scss',
})
export class TaskHeader {}
