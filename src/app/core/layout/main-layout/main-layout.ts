import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from '../components/app-header/app-header';
import { AppFooter } from '../components/app-footer/app-footer';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, AppHeader, AppFooter],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
