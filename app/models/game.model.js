import mongoose from 'mongoose';

let gameSchema = new mongoose.Schema({
  players: [{
    name: { type: String },
    score: { type: Number }
  }],
  winner: { type: String },
  time: { type: Date }
});

export default mongoose.model('Game', gameSchema);