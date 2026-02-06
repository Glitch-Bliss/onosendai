// src/app/core/api/fake-games-store.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Game } from '../../models/Game.model';
import { Crew } from '../../models/Crew.model';
import { Agent } from '../../models/Agent.model';
import { Item } from '../../models/Item.model';

@Injectable({
  providedIn: 'root',
})
export class FakeGameStoreService {

  /* ======================
     Internal signals
     ====================== */

  private readonly _games = signal<Game[]>([]);
  private readonly _loading = signal(false);

  /* ======================
     Public computed signals
     ====================== */

  readonly games = computed(() => this._games());
  readonly loading = computed(() => this._loading());

  constructor(private http: HttpClient) {}

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

  /* ======================
     Query helpers
     ====================== */
  getGameById(id: string) {
    return computed(() => this._games().find(g => g.id === id));
  }

  getCrewById(gameId: string, crewId: string) {
    return computed(() => this._games()
      .find(g => g.id === gameId)
      ?.crews.find(c => c.id === crewId));
  }

  getAgentById(gameId: string, crewId: string, agentId: string) {
    return computed(() => this._games()
      .find(g => g.id === gameId)
      ?.crews.find(c => c.id === crewId)
      ?.agents.find(a => a.id === agentId));
  }

  /* ======================
     Mutation helpers
     ====================== */

  addGame(game: Game) {
    this._games.update(list => [...list, game]);
  }

  addCrew(gameId: string, crew: Crew) {
    this._games.update(list =>
      list.map(g =>
        g.id === gameId ? { ...g, crews: [...g.crews, crew] } : g
      )
    );
  }

  addAgent(gameId: string, crewId: string, agent: Agent) {
    this._games.update(list =>
      list.map(g => {
        if (g.id !== gameId) return g;
        return {
          ...g,
          crews: g.crews.map(c =>
            c.id === crewId ? { ...c, agents: [...c.agents, agent] } : c
          )
        };
      })
    );
  }

  addItemToCrewStash(gameId: string, crewId: string, item: Item) {
    this._games.update(list =>
      list.map(g => {
        if (g.id !== gameId) return g;
        return {
          ...g,
          crews: g.crews.map(c =>
            c.id === crewId ? { ...c, stash: [...c.stash, item] } : c
          )
        };
      })
    );
  }

  addLogEvent(gameId: string, crewId: string, log: { id: string; name: string; description?: string; imageUrl?: string }) {
    this._games.update(list =>
      list.map(g => {
        if (g.id !== gameId) return g;
        return {
          ...g,
          crews: g.crews.map(c =>
            c.id === crewId ? { ...c, log: [...c.log, log] } : c
          )
        };
      })
    );
  }

  updateAgentState(gameId: string, crewId: string, agentId: string, newState: any) {
    this._games.update(list =>
      list.map(g => {
        if (g.id !== gameId) return g;
        return {
          ...g,
          crews: g.crews.map(c => {
            if (c.id !== crewId) return c;
            return {
              ...c,
              agents: c.agents.map(a =>
                a.id === agentId ? { ...a, state: newState } : a
              )
            };
          })
        };
      })
    );
  }
}
