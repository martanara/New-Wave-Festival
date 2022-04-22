//concerts.controller.js

const concertModel = require('../models/concert.model');
const Concert = require('../models/concert.model');
const Day = require('../models/day.model');
const Seat = require('../models/seat.model');

exports.getAllEntrys = async (req, res) => {
  try {
    let concerts = await Concert.find().populate('Day');
    concerts = JSON.parse(JSON.stringify(concerts))

    for (let concert of concerts){
      const day = await Day.findOne({ _id: concert.day });
      const seats = await Seat.find({ day: concert.day });
      console.log(seats.length);
      concert.day = day.festivalDay;
      concert.ticketsSold = seats.length;
    } 

    console.log(concerts);
    res.json(concerts);
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getEntryById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if(!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addNewEntry = async (req, res) => {
  const { performer, genre, price, day } = req.body;

  try {
    const newConcert = new Concert({ performer, genre, price, day })
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.editEntry = async (req, res) => {
  const { performer, genre, price, day } = req.body;

  try {
    const concert = await Concert.findById(req.params.id);
    if(concert){
      concert.performer = performer;
      concert.genre = genre;
      concert.price = price;
      concert.day = day;
      await concert.save();
      res.json(await Concert.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const concert = Concert.findById(req.params.id);
    if(concert){
      await Concert.deleteOne({ _id: req.params.id });
      res.json(await Concert.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};