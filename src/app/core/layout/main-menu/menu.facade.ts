import { computed, Injectable, signal } from "@angular/core";
import { MenuItem } from "./menu-item-model";
import { UserRole } from "../../enums/user-role.enum";
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root' })
export class MenuFacade {

  readonly menu = computed<MenuItem[]>(() => {
    //const role = this.authFacade.currentRole();
    const role = UserRole.ADMIN;

    return this.router.config
      .filter(route => route.data?.['menu'])
      .map(route => {
        const menu = route.data!['menu'];
        return {
          ...menu,
          route: `/${route.path}`,
        } as MenuItem;
      })
      .filter(item =>
        !item.roles || item.roles.includes(role!)
      );
  });

  constructor(
    private router: Router,
    //private authFacade: AuthFacade
  ) {}
}
