// src/app/core/api/games-api.ts
import { Signal } from '@angular/core';
import { Game } from '../models/Game.model';
import { Crew } from '../models/Crew.model';
import { Agent } from '../models/Agent.model';
import { Item } from '../models/Item.model';
import { Player } from '../models/Player.model';

export interface IGameStore {
  games: Signal<Game[]>;
  currentGame: Signal<Game | null>;
  currentPlayers: Signal<Player[] | null>;
  currentPlayer: Signal<Player | null>;
  loading: Signal<boolean>;

  loadGames(): void;
  getGameById(id: string): void;
  getCrewById(gameId: string, crewId: string): Signal<Crew | null>;
  getAgentById(gameId: string, crewId: string, agentId: string): Signal<Agent | null>;
  setCurrentPlayer(id: string): void;

  addGame(game: Game): void;
  addCrew(gameId: string, crew: Crew): void;
  addAgent(gameId: string, crewId: string, agent: Agent): void;
  addItemToCrewStash(gameId: string, crewId: string, item: Item): void;
  addLogEvent(gameId: string, crewId: string, log: { id: string; name: string; description?: string; imageUrl?: string }): void;
  updateAgentState(gameId: string, crewId: string, agentId: string, newState: any): void;
}
