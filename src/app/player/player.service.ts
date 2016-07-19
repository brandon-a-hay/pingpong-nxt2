import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Player } from '../player/player.component';
const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class PlayerService {

  constructor(public http: Http) {

  }

  getAll() {
    return this.http.get('/api/player')
      .map(res => res.json());
  }

  create(data) {
    return this.http.post('/api/player', JSON.stringify(data), HEADER)
      .map(res => res.json());
  }

  delete(id) {
    return this.http.delete(`/api/player/${id}`)
      .map(res => res.json());
  }

  update(player: Player) {
    return this.http.put(`/api/player/${player._id}`, JSON.stringify(player), HEADER)
      .map(res => res.json());
  }
}
