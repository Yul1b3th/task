import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigationService } from '@core/navigation/main-navigation.service';
import { mainNavigation } from '@core/navigation/main-navigation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class App implements OnInit {
  private nav = inject(NavigationService);

  ngOnInit() {
    this.nav.init(mainNavigation);
  }
}
