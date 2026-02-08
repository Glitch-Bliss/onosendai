import { Component, inject, signal } from '@angular/core';
import { AppShellComponent } from "./core/layout/app-shell/app-shell";
import { USER_STORE } from './core/api/user.store.token';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [AppShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('onosendai');

  readonly userStore = inject(USER_STORE);

  constructor() {
    //This will be made in a connextion page and shell with functionalities conditional to the retrieving of user
    this.userStore.loadUser("mock");
  }

}