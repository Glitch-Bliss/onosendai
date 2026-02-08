// src/app/core/api/fake-games-store.service.ts
import { Injectable, signal, computed, Signal, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Game } from '../../models/Game.model';
import { Crew } from '../../models/Crew.model';
import { Agent } from '../../models/Agent.model';
import { Item } from '../../models/Item.model';
import { IGameStore } from '../../interfaces/game-store.interface';
import { USER_STORE } from '../user.store.token';

@Injectable({
  providedIn: 'root',
})
export class FakeGameStore implements IGameStore {

  private readonly http = inject(HttpClient);
  private readonly userStore = inject(USER_STORE);

  /* ======================
     Internal signals
     ====================== */

  private readonly _games = signal<Game[]>([]);
  private readonly _loading = signal(false);
  private readonly _currentGame = signal<Game | null>(null);
  private readonly _currentPlayerId = signal<string | null>(null);

  /* ======================
     Public computed signals
     ====================== */

  readonly games = computed(() => this._games());
  readonly loading = computed(() => this._loading());
  readonly currentGame = computed(() => this._currentGame());
  readonly currentPlayers = computed(() => this._currentGame()?.players ?? null);
  readonly currentPlayer = computed(() => {
    if (this._currentPlayerId()) {
      return this.currentPlayers()?.find(player => player.id === this._currentPlayerId()) ?? null;
    }

    const current =  this.currentPlayers()?.find(player => player.user.id === this.userStore.user()?.id) ?? null;
    return current || this.currentPlayers()?.at(0) || null;
  });

  getCrewById(gameId: string, crewId: string): Signal<Crew | null> {
    throw new Error('Method not implemented.');
  }
  getAgentById(gameId: string, crewId: string, agentId: string): Signal<Agent | null> {
    throw new Error('Method not implemented.');
  }
  addGame(game: Game): void {
    throw new Error('Method not implemented.');
  }
  addCrew(gameId: string, crew: Crew): void {
    throw new Error('Method not implemented.');
  }
  addAgent(gameId: string, crewId: string, agent: Agent): void {
    throw new Error('Method not implemented.');
  }
  addItemToCrewStash(gameId: string, crewId: string, item: Item): void {
    throw new Error('Method not implemented.');
  }
  addLogEvent(gameId: string, crewId: string, log: { id: string; name: string; description?: string; imageUrl?: string; }): void {
    throw new Error('Method not implemented.');
  }
  updateAgentState(gameId: string, crewId: string, agentId: string, newState: any): void {
    throw new Error('Method not implemented.');
  }

  /* ======================
     Load mock JSON
     ====================== */
  loadGames() {
    this._loading.set(true);
    this.http.get<{ games: Game[] }>('/assets/mocks/games.json')
      .pipe(delay(400)) // simulate network
      .subscribe(res => {
        this._games.set(res.games);
        this._loading.set(false);
      });
  }

  getGameById(id: string) {
    this._loading.set(true);
    this.http.get<Game>('/assets/mocks/game.json')
      .pipe(delay(400)) // simulate network
      .subscribe(res => {
        this._currentGame.set(res);
        this._loading.set(false);
      });
  }

  setCurrentPlayer(id: string) {
    this._currentPlayerId.set(id);
  }

}
