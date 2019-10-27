import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'climathon-ma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LoWA - Local Weather Alert';

  constructor(private router: Router) {}

  isActiveState(route: string) {
    return `/${route}`.toLowerCase().trim() === this.router.url.toLowerCase().trim();
  }

  route(to: string) {
    this.router.navigate([to]);
  }
}
