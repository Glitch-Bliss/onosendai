import { Component, inject } from '@angular/core';
import { GAME_STORE } from '../../../../core/api/game.store.token';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-current-games-list',
  imports: [RouterModule],
  templateUrl: './games-list.html',
  styleUrl: './games-list.scss',
})
export class GamesList {

  api = inject(GAME_STORE);

  ngOnInit() {
    this.api.loadGames();
  }

}
