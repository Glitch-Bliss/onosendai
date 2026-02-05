import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcherComponent {
  constructor(private translate: TranslateService) { }

  setLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}