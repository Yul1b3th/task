import { App } from './../../../../app';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NavigationService } from '@core/navigation/main-navigation.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  private navService = inject(NavigationService);

  navItems = this.navService.items;
}
