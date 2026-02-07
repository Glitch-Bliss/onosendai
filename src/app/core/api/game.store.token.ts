import { InjectionToken } from '@angular/core';
import { IGameStore as IGameStore } from '../interfaces/game-store.interface';

export const GAME_STORE = new InjectionToken<IGameStore>(
  'GAMES_STORE'
);
