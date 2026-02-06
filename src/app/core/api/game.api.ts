
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/Game.model';
import { Crew } from '../models/Crew.model';
import { Agent } from '../models/Agent.model';
import { Item } from '../models/Item.model';
import { GameApiInterface } from '../interfaces/game-api.interface';
import { LogEvent } from '../models/Log-event.model';

@Injectable()
export class GamesApi implements GameApiInterface {

    private readonly _games = signal<Game[]>([]);
    private readonly _loading = signal(false);

    readonly games = computed(() => this._games());
    readonly loading = computed(() => this._loading());

    constructor(private http: HttpClient) { }

    /* ======================
       Load all games from backend
       ====================== */
    loadGames(): void {
        this._loading.set(true);
        this.http.get<Game[]>('/api/games').subscribe({
            next: (data) => {
                this._games.set(data);
                this._loading.set(false);
            },
            error: () => this._loading.set(false)
        });
    }

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
       Mutation helpers — proxy to backend
       ====================== */

    addGame(game: Game) {
        this.http.post<Game>('/api/games', game).subscribe(g => {
            this._games.update(list => [...list, g]);
        });
    }

    addCrew(gameId: string, crew: Crew) {
        this.http.post<Crew>(`/api/games/${gameId}/crews`, crew).subscribe(c => {
            this._games.update(list =>
                list.map(g =>
                    g.id === gameId ? { ...g, crews: [...g.crews, c] } : g
                )
            );
        });
    }

    addAgent(gameId: string, crewId: string, agent: Agent) {
        this.http.post<Agent>(`/api/games/${gameId}/crews/${crewId}/agents`, agent).subscribe(a => {
            this._games.update(list =>
                list.map(g => {
                    if (g.id !== gameId) return g;
                    return {
                        ...g,
                        crews: g.crews.map(c =>
                            c.id === crewId ? { ...c, agents: [...c.agents, a] } : c
                        )
                    };
                })
            );
        });
    }

    addItemToCrewStash(gameId: string, crewId: string, item: Item) {
        this.http.post<Item>(`/api/games/${gameId}/crews/${crewId}/stash`, item).subscribe(i => {
            this._games.update(list =>
                list.map(g => {
                    if (g.id !== gameId) return g;
                    return {
                        ...g,
                        crews: g.crews.map(c =>
                            c.id === crewId ? { ...c, stash: [...c.stash, i] } : c
                        )
                    };
                })
            );
        });
    }

    addLogEvent(
        gameId: string,
        crewId: string,
        log: { id: string; name: string; description?: string; imageUrl?: string }
    ) {
        this.http.post<LogEvent>(`/api/games/${gameId}/crews/${crewId}/log`, log)
            .subscribe(savedLog => {
                this._games.update(list =>
                    list.map(g => {
                        if (g.id !== gameId) return g;
                        return {
                            ...g,
                            crews: g.crews.map(c =>
                                c.id === crewId ? { ...c, log: [...c.log, savedLog] } : c
                            )
                        };
                    })
                );
            });
    }

    updateAgentState(gameId: string, crewId: string, agentId: string, newState: any) {
        this.http.patch<Agent>(`/api/games/${gameId}/crews/${crewId}/agents/${agentId}/state`, { state: newState })
            .subscribe(updated => {
                this._games.update(list =>
                    list.map(g => {
                        if (g.id !== gameId) return g;
                        return {
                            ...g,
                            crews: g.crews.map(c =>
                                c.id === crewId ? {
                                    ...c,
                                    agents: c.agents.map(a =>
                                        a.id === agentId ? { ...a, state: updated.state } : a
                                    )
                                } : c
                            )
                        };
                    })
                );
            });
    }
}
