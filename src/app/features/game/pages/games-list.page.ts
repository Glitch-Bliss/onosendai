import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { I18nService } from "../../../core/services/i18n.service";
import { GamesList } from "../components/games-list/games-list";

@Component({
    standalone: true,
    selector: 'app-games-page',
    imports: [
    CommonModule,
    GamesList
],
    template: `
    <h1>@for (c of title(); track $index) { <span>{{ c }}</span> }</h1>
    <app-games-list/>
  `,
})
export class GamesListPage {
    i18nService = inject(I18nService);
    title = this.i18nService.t('TITLES.GAMESLIST');

}
