const mongoose = require('mongoose');

const campanhaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goal: { type: Number, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  donations: [{
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  }],
  totalRaised: { type: Number, default: 0 },
});

module.exports = mongoose.model('Campanha', campanhaSchema);