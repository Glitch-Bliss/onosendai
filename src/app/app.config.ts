import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { GAME_STORE } from './core/api/game.store.token';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { FakeGameStore } from './core/api/fakes/game.store';
import { USER_STORE } from './core/api/user.store.token';
import { FakeUserStore } from './core/api/fakes/user.store';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: GAME_STORE,
      useClass: FakeGameStore
    },
    {
      provide: USER_STORE,
      useClass: FakeUserStore
    },    
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      lang: 'fr',
      fallbackLang: 'fr',
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      })
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      translate.use(translate.getBrowserLang() || "fr");
    })
  ]
};
