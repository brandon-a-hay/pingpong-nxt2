import mongoose from 'mongoose';

let playerSchema = new mongoose.Schema({
  name: { type: String },
  wins: { type: Number },
  losses: { type: Number },
  pointDifferential: { type: Number },
  winPctg: { type: Number },
  streak: {
    outcome: String,
    count: Number
  }
});

export default mongoose.model('Player', playerSchema);