import { Routes } from '@angular/router';
import { UserRole } from './core/enums/user-role.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.page')
        .then(m => m.HomePage),
    data: {
      menu: {
        id: 'home',
        label: 'Home',
        icon: 'home',
        order: 1,
      },
    },
  },
  {
    path: 'qurcodeGenerator',
    loadComponent: () =>
      import('./features/qrcodes-generator/pages/qr-code-generator.page')
        .then(m => m.QrCodeGeneratorPage),
    data: {
      menu: {
        id: 'qrcodegenerator',
        label: 'QR Codes Generator',
        icon: 'qrcode',
        order: 2,
        roles: [UserRole.USER, UserRole.ADMIN],
      },
    },
  },
  {
    path: 'scannersdemo',
    loadComponent: () =>
      import('./features/scanners-demo/pages/demo.page')
        .then(m => m.DemoPage),
    data: {
      menu: {
        id: 'scannersdemo',
        label: 'Demo of scanners',
        icon: 'qrcode',
        order: 3,
        roles: [UserRole.USER, UserRole.ADMIN],
      },
    },
  },
  {
    path: 'gameslist',
    loadComponent: () =>
      import('./features/game/pages/games-list.page')
        .then(m => m.GamesListPage),
    data: {
      menu: {
        id: 'gameslist',
        label: 'Games List Page',
        icon: 'home',
        order: 4,
      },
    },
  }
];
