import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { MainMenu as MainMenuComponent } from '../main-menu/main-menu';


@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [MainMenuComponent, RouterOutlet],
  templateUrl: './app-shell.html'
})
export class AppShellComponent {}