//seats.controller.js

const sanitize = require('mongo-sanitize');

const Seat = require('../models/seat.model');
const Day = require('../models/day.model');

exports.getAllEntrys = async (req, res) => {
  try {
    res.json(await Seat.find().populate('day'));
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
  const cleanBody = await sanitize(req.body);
  const { day, seat, client, email } = cleanBody;

  const festivalDay = await Day.findOne({ festivalDay: day });
  const festivalDayId = festivalDay._id;
  const isTaken = await Seat.findOne({ day: festivalDayId, seat: seat });

  if(!isTaken){
    try {
      const newSeat = new Seat({ day: festivalDayId, seat: seat, client: client, email: email })
      await newSeat.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(409).json({ message: 'This seat is already reserved...' });
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
