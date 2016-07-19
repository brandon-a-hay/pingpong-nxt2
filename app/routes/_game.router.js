import Game from '../models/game.model';

export default (app, router) => {
  router.route('/game')

  // submit new game
  .post((req, res) => {

    Game.create({
      players: req.body.players,
      winner: req.body.winner,
      time: new Date()
    }, (err, game) => {
      if (err)
        res.send(err);

      console.log(`New game submitted. Winner = ${game.winner}`);
    });
  });

}