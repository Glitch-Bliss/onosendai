import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { User } from "../../models/User.model";
import { delay } from "rxjs";

@Injectable()
export class FakeUserStore {
  private readonly http = inject(HttpClient);

  /* =========================
     State
     ========================= */

  private readonly _user = signal<User | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  /* =========================
     Public selectors
     ========================= */

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  /* =========================
     Commands
     ========================= */

  loadUser(id: string) {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<User>('/assets/mocks/user.json')
      .pipe(delay(400)) // simulate network
      .subscribe(res => {
        this._user.set(res);
        this._loading.set(false);
      });
  }

  clear() {
    this._user.set(null);
  }
}
