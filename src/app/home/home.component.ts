import { Component } from '@angular/core';
import { AppState } from '../app.service';
import { Title } from './services/title';
import { XLarge } from './directives/x-large';
import { Accordion } from '../shared/components/accordion/accordion.component';
import { AccordionGroup } from '../shared/components/accordion/accordion-group.component';
import { NgFor } from '@angular/common';
import { NG_TABLE_DIRECTIVES } from 'ng2-table/ng2-table';
import { PlayerService } from '../player/player.service';
import { GameService } from '../game/game.service';
import { Player } from '../player/player.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'home',
  providers: [ Title, PlayerService, GameService ],
  directives: [
      XLarge,
      Accordion,
      AccordionGroup,
      NgFor,
      NG_TABLE_DIRECTIVES,
      Player
  ],
  pipes: [ ],
  styles: [ require('./home.css') ],
  template: require('./home.html')
})
export class Home {
  localState = { value: '' };
  public players: Observable<Array<Player>>;
  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Name', name: 'name'},
    {title: 'Wins', name: 'wins'},
    {title: 'Losses', name: 'losses'},
    {title: 'Streak', name: 'streakDisplay'},
    {title: 'Win %', name: 'winPctg', sort: 'desc'}
  ];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: '', columnName: 'name'}
  };
  public player1 = {
    name: '',
    score: 0
  };
  public player2 = {
    name: '',
    score: 0
  };
  public data: Array<Player>;

  isOpen: boolean = false;
  groups: Array<any> = [
      {
          heading: 'Dynamic 1',
          content: 'I am dynamic!'
      },
      {
          heading: 'Dynamic 2',
          content: 'Dynamic as well'
      }
  ];

  constructor(public appState: AppState, public title: Title, public playerService: PlayerService, public gameService: GameService) {
    playerService.getAll().subscribe((res) => {
      this.data = res;
      this.updateStreaks();
      this.player1.name = this.data[0].name;
      this.player2.name = this.data[1].name;
      this.onChangeTable(this.config);
    });
  }

// grid functions
  changePage(page: any, data: Array<any> = this.data): Array<any> {
    console.log(page);
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  changeSort(data, config) {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '') {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous, current) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  changeFilter(data, config) {
    if (!config.filtering) {
      return data;
    }

    let filteredData: Array<any> = data.filter((item: any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString));

    return filteredData;
  }

  onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  // updates the streak column in the table
  updateStreaks() {
    this.data.forEach(p => {
      p.streakDisplay = p.streak.outcome + p.streak.count;
    });
  }

  // end grid functions

  // post game processing

  addGame() {
    let result = this.getMatchResult(this.player1, this.player2);
    let game = {
      winner: result.winner
    };
    this.gameService.createGame(game).subscribe();
    this.updatePlayerStats(result.winner, result.loser);
  }

  getMatchResult(p1, p2) {
    let winner: Player;
    let loser: Player;
    if (p1.score > p2.score ) {
      this.data.forEach((player) => {
        if (player.name == this.player1.name) {
          player.wins++;
          winner = player;
        }
        if (player.name == this.player2.name) {
          player.losses++;
          loser = player;
        }
      });
    } else if (p1.score < p2.score) {
      this.data.forEach((player) => {
        if (player.name == this.player2.name) {
          player.wins++;
          winner = player;
        }
        if (player.name == this.player1.name) {
          player.losses++;
          loser = player;
        }
      });
    } else {
      console.log('ummmm, tie?');
      return null;
    }
    winner.currentGameScore = p1.score;
    loser.currentGameScore = p2.score;
    return { winner, loser };
  }

  updatePlayerStats(winner: Player, loser: Player) {
    let pointDifferential = 0;
    pointDifferential = winner.currentGameScore - loser.currentGameScore;

    winner.pointDifferential += pointDifferential;
    winner.winPctg = +(winner.wins / (winner.wins + winner.losses)).toFixed(2) * 100;

    loser.pointDifferential -= pointDifferential;
    loser.winPctg = +(loser.wins / (loser.wins + loser.losses)).toFixed(2) * 100;

    this.getStreak(winner, loser);
    this.updateStreaks();
    this.onChangeTable(this.config);

    this.playerService.update(winner).subscribe();
    this.playerService.update(loser).subscribe();
  }

  getStreak(winner: Player, loser: Player) {
    if (winner.streak.outcome == 'L') {
      // if the match winner had a previous losing streak...
      winner.streak.outcome = 'W';
      winner.streak.count = 1;
    } else {
      // the winner has won previously so just increment their win streak count
      winner.streak.count++;
    }

    if (loser.streak.outcome == 'W') {
      // if the match loser was previously on a win streak...
      loser.streak.outcome = 'L';
      loser.streak.count = 1;
    } else {
      loser.streak.count++;
    }
  }

  // end post game processing
}
