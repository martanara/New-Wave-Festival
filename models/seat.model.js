const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  day: { type: String, required: true, ref: 'Day'}, 
  seat: { type: Number, required: true, min: 1, max: 50 }, 
  client: { type: String, required: true, match: [/^(?![\s.]+$)[a-zA-Z\s.]*$/, 'Please enter a valid name'] },
  email: { type: String, required: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'] },
});

module.exports = mongoose.model('Seat', seatSchema);