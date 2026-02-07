import { Component, inject, Signal } from '@angular/core';
import { GAME_STORE } from '../../../../core/api/game.store.token';
import { IGameStore } from '../../../../core/interfaces/game-store.interface';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../../../core/models/Game.model';

@Component({
  selector: 'app-current-game',
  imports: [],
  templateUrl: './current-game.html',
  styleUrl: './current-game.scss',
})
export class CurrentGame {
  gameStore: IGameStore = inject(GAME_STORE);
  readonly game: Signal<Game | null> = this.gameStore.currentGame;


}
