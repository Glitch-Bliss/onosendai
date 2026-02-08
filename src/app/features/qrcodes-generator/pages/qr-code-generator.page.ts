import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { QrCodeGeneratorComponent } from "../components/generator/generator.component";
import { I18nService } from "../../../core/services/i18n.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
    standalone: true,
    selector: 'app-qr-page',
    styles:':host{padding:2%}',
    imports: [
        CommonModule,
        QrCodeGeneratorComponent
    ],
    template: `
    <h1>@for (c of title(); track $index) { <span>{{ c }}</span> }</h1>
    <app-qr-code-generator/>
  `,
})
export class QrCodeGeneratorPage {
    i18nService = inject(I18nService);
    title = this.i18nService.t('TITLES.GENERATOR');

}
