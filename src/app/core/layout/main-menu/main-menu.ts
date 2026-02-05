import { Component, Signal } from '@angular/core';
import { MenuFacade } from './menu.facade';
import { MenuItem } from './menu-item-model';
import { RouterModule } from '@angular/router';
import { LanguageSwitcherComponent } from "./language-switcher/language-switcher";

@Component({
  standalone: true,
  selector: 'app-main-menu',
  imports: [RouterModule, LanguageSwitcherComponent],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
})

export class MainMenu {
  
  public menu:Signal<MenuItem[]>;

  constructor(private menuFacade: MenuFacade) {
    this.menu = menuFacade.menu;
  }

}