import { Component, signal, Signal } from '@angular/core';
import { MenuFacade } from './menu.facade';
import { MenuItem } from './menu-item-model';
import { RouterModule } from '@angular/router';
import { LanguageSwitcherComponent } from "./language-switcher/language-switcher";
import { ButtonComponent } from "../../../shared/components/button-component/button-component";

@Component({
  standalone: true,
  selector: 'app-main-menu',
  imports: [RouterModule, LanguageSwitcherComponent, ButtonComponent],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
})

export class MainMenu {
  open = signal(false);
  public menu: Signal<MenuItem[]>;

  constructor(private menuFacade: MenuFacade) {
    this.menu = menuFacade.menu;
  }

  closeMenu() {
    this.open.set(false);
  }

  toggleOpen() {
    this.open.update(isOpen => !isOpen);
  }

}