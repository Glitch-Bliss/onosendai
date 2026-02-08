import { Component, inject, Signal } from '@angular/core';
import { Player } from '../../../../core/models/Player.model';
import { GAME_STORE } from '../../../../core/api/game.store.token';

@Component({
  selector: 'app-agents',
  imports: [],
  templateUrl: './agents.html',
  styleUrl: './agents.scss',
})
export class Agents {
  readonly gameStore = inject(GAME_STORE);
  readonly currentPlayer: Signal<Player | null> = this.gameStore.currentPlayer;

  constructor() {
    console.info("Current player : ", this.currentPlayer());
  }
}
