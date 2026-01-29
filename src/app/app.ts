import { Component, signal } from '@angular/core';
import { AppShellComponent } from "./core/layout/app-shell/app-shell";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [AppShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('onosendai');
}