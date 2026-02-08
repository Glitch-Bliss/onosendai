import { Component, effect, inject, Signal } from '@angular/core';
import { IGameStore } from '../../../../core/interfaces/game-store.interface';
import { GAME_STORE } from '../../../../core/api/game.store.token';
import { Player } from '../../../../core/models/Player.model';
import { CommonModule } from '@angular/common';
import { Agents } from "../agents/agents";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-players',
  imports: [CommonModule, RouterModule, Agents],
  templateUrl: './players.html',
  styleUrl: './players.scss',
})
export class Players {
  gameStore: IGameStore = inject(GAME_STORE);
  players: Signal<Player[] | null> = this.gameStore.currentPlayers;
}
