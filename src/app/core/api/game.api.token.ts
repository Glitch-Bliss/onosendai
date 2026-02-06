import { InjectionToken } from '@angular/core';
import { GameApiInterface } from '../interfaces/game-api.interface';

export const GAME_API = new InjectionToken<GameApiInterface>(
  'GAMES_API'
);
