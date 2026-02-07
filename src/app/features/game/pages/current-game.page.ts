import { CommonModule } from "@angular/common";
import { Component, effect, inject, Signal } from "@angular/core";
import { Players } from "../components/players/players";
import { CurrentGame } from "../components/current-game/current-game";
import { ActivatedRoute } from "@angular/router";
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from "rxjs";
import { GAME_STORE } from "../../../core/api/game.store.token";

@Component({
  standalone: true,
  selector: 'app-current-games-page',
  imports: [
    CommonModule,
    Players,
    CurrentGame
  ],
  template: `
    <app-players/>
    <app-current-game/>
  `,
})
export class CurrentGamePage {

  private readonly store = inject(GAME_STORE);
  private route = inject(ActivatedRoute);

  readonly gameId: string | null = this.route.snapshot.paramMap.get('id');

  constructor() {
      this.store.getGameById(this.gameId!);
  }

}


