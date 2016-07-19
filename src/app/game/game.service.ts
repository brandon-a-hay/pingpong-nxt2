import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class GameService {

  constructor(public http: Http) { }

  createGame(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/game', JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }

}