import Player from '../models/player.model';

export default (app, router) => {
  router.route('/player')

  // create a new player
  .post((req, res) => {

    Player.create({
      name: req.body.name,
      wins: 0,
      losses: 0,
      pointDifferential: 0,
      winPctg: 0,
      streak: ''
    }, (err, player) => {
      if (err)
        res.send(err);

      console.log(`Player created: ${player}`);

      // get and return all players after one has been created
      Player.find((err, players) => {
        if (err)
          res.send(err);

        res.json(players)
      });
    });
  })

  // get all players
  .get((req, res) => {

    Player.find((err, player) => {
      if (err)
        res.send(err);

      else
        res.json(player);
    });
  })

  router.route('/player/:player_id')

  // update a player
  .put((req, res) => {
    Player.findOne({
      '_id': req.params.player_id
    }, (err, player) => {
      if (err)
        res.send(err);

      player.wins = req.body.wins;
      player.losses = req.body.losses;
      player.pointDifferential = req.body.pointDifferential;
      player.winPctg = req.body.winPctg;
      player.streak = req.body.streak;

      // save the player record
      return player.save(err => {
        if (err)
          res.send(err);

        return res.send(player);
      });
    });
  })
  
  // remove a player
  .delete((req, res) => {
    console.log(`Attempting to delete player: ${req.params.name}`);

    Player.remove({
      _id: req.params.player_id
    }, (err, player) => {
      if (err)
        res.send(err);

      console.log(`${req.params.name} was successfully deleted!`);

      Player.find((err, players) => {
        if (err)
          res.send(err);

        res.json(players);
      });
    });
  });

}