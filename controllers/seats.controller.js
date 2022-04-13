//seats.controller.js

const Seat = require('../models/seat.model');

exports.getAllEntrys = async (req, res) => {
  try {
    res.json(await Seat.find().populate('Day'));
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getEntryById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addNewEntry = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const newSeat = new Seat({ day, seat, client, email })
    await newSeat.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

// implement isTaken

exports.editEntry = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const newSeat = await Seat.findById(req.params.id);
    if(newSeat){
      newSeat.day = day;
      newSeat.seat = seat;
      newSeat.client = client;
      newSeat.email = email;
      await newSeat.save();
      res.json(await Seat.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const seat = Seat.findById(req.params.id);
    if(seat){
      await Seat.deleteOne({ _id: req.params.id });
      res.json(await Seat.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};
