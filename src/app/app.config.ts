import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { GAME_API } from './core/api/game.api.token';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { FakeGameStoreService } from './core/api/fakes/game.api';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: GAME_API,
      useClass: FakeGameStoreService
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
