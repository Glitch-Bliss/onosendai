// src/app/core/i18n.service.ts
import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private translate = inject(TranslateService);

  // signal that tracks the current language
  private currentLang = signal(this.translate.currentLang);

  constructor() {
    // update signal when language changes
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang.set(event.lang);
    });
  }

  /**
   * Switch the language
   */
  use(lang: string) {
    this.translate.use(lang);
    this.currentLang.set(lang); // update signal immediately
  }

  /**
   * Reactive translation
   * Returns a computed signal
   */
  t(key: string, params?: Record<string, unknown>) {
    return computed(() => {
      this.currentLang(); //force reload of computed when currentLang changes
      return this.translate.instant(key, params);
    });
  }

  /**
   * Synchronous translation (like instant)
   */
  tSync(key: string, params?: Record<string, unknown>) {
    return this.translate.instant(key, params);
  }

  /**
   * Observable translation if you still need get()
   */
  get(key: string, params?: Record<string, unknown>) {
    return this.translate.get(key, params);
  }

  /**
   * Access current language
   */
  get lang() {
    return this.currentLang();
  }
}
