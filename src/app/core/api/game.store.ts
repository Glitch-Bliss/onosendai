
import { Injectable, signal, computed, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/Game.model';
import { Crew } from '../models/Crew.model';
import { Agent } from '../models/Agent.model';
import { Item } from '../models/Item.model';
import { IGameStore } from '../interfaces/game-store.interface';
import { LogEvent } from '../models/Log-event.model';
import { Player } from '../models/Player.model';

@Injectable()
export class GameStore implements IGameStore {

    private readonly _games = signal<Game[]>([]);
    private readonly _currentGame = signal<Game | null>(null);
    private readonly _loading = signal(false);

    readonly games = computed(() => this._games());
    readonly currentGame = computed(() => this._currentGame());
    readonly currentPlayers: Signal<Player[]> = signal([]);
    readonly loading = computed(() => this._loading());
    readonly currentPlayer: Signal<Player | null> = signal<Player | null>(null);

    constructor(private http: HttpClient) { }
    setCurrentPlayer(id: string): void {
        throw new Error('Method not implemented.');
    }


    getGameById(id: string): Signal<Game | null> {
        throw new Error('Method not implemented.');
    }
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
}