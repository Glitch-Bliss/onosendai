import { Component, inject } from '@angular/core';
import { GAME_API } from '../../../../core/api/game.api.token';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-games-list',
  imports: [RouterModule],
  templateUrl: './games-list.html',
  styleUrl: './games-list.scss',
})
export class GamesList {

  api = inject(GAME_API);

  ngOnInit() {
    this.api.loadGames();
  }

}
