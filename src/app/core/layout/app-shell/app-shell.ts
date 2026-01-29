import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { MainMenu as MainMenuComponent } from '../main-menu/main-menu';
import { Footer } from "../footer/footer";


@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [MainMenuComponent, RouterOutlet, Footer],
  templateUrl: './app-shell.html'
})
export class AppShellComponent {}