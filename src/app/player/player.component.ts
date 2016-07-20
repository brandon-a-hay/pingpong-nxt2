import { Component } from '@angular/core';
import { PlayerService } from './player.service';
import { HTTP_PROVIDERS } from '@angular/http';
import { NgFor } from '@angular/common';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'new-player',
  providers: [...HTTP_PROVIDERS, PlayerService],
  directives: [],
  template: require('./players.html')
})

export class Player {
  _id: number;
  players: Observable<Array<Player>>;
  name: string = '';
  wins: number;
  losses: number;
  pointDifferential: number;
  streak: {
    outcome: string,
    count: number
  };
  winPctg: number;
  currentGameScore: number;
  streakDisplay: string;
  highestWinStreak: number;

  constructor(public playerService: PlayerService) { }

  createPlayer() {
    this.playerService.create(this.name)
      .subscribe((res) => {
        this.players = res;
        this.name = '';
      });
  }

  deletePlayer(id) {
    this.playerService.delete(id)
      .subscribe((res) => {
        this.players = res;
      });
  }

  updatePlayer(player: Player) {
    this.playerService.update(player)
      .subscribe((res) => {
        this.players = res;
      });
  }

  updatePlayers(players: Array<Player>) {
    players.forEach(player => {
      this.playerService.update(player)
        .subscribe(res => {
          console.log(res);
          this.players = res;
        });
    });
  }

}