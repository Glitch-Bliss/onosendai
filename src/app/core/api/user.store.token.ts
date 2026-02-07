import { InjectionToken } from '@angular/core';
import { IUserStore } from '../interfaces/user-store.interface';

export const USER_STORE = new InjectionToken<IUserStore>(
  'USER_STORE'
);
