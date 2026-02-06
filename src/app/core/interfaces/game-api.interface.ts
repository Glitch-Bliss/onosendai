// src/app/core/api/games-api.ts
import { Signal } from '@angular/core';
import { Game } from '../models/Game.model';
import { Crew } from '../models/Crew.model';
import { Agent } from '../models/Agent.model';
import { Item } from '../models/Item.model';

export interface GameApiInterface {
  games: Signal<Game[]>;
  loading: Signal<boolean>;

  loadGames(): void;
  getGameById(id: string): Signal<Game | undefined>;
  getCrewById(gameId: string, crewId: string): Signal<Crew | undefined>;
  getAgentById(gameId: string, crewId: string, agentId: string): Signal<Agent | undefined>;

  addGame(game: Game): void;
  addCrew(gameId: string, crew: Crew): void;
  addAgent(gameId: string, crewId: string, agent: Agent): void;
  addItemToCrewStash(gameId: string, crewId: string, item: Item): void;
  addLogEvent(gameId: string, crewId: string, log: { id: string; name: string; description?: string; imageUrl?: string }): void;
  updateAgentState(gameId: string, crewId: string, agentId: string, newState: any): void;
}
