import { Signal } from '@angular/core';
import { User } from '../models/User.model';

export interface IUserStore {
  readonly user: Signal<User | null>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;

  loadUser(id: string): void;
  clear(): void;
}
