//concerts.controller.js

const Concert = require('../models/concert.model');

exports.getAllEntrys = async (req, res) => {
  try {
    res.json(await Concert.find().populate('Day'));
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