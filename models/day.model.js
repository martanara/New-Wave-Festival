const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  festivalDay: { type: Number, required: true },
})

module.exports = mongoose.model('Day', daySchema);