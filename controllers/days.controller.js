//days.controller.js

const Day = require('../models/day.model');

exports.getAllEntrys = async (req, res) => {
  try {
    res.json(await Day.find());
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getEntryById = async (req, res) => {
  try {
    const day = await Day.findById(req.params.id);
    if(!day) res.status(404).json({ message: 'Not found' });
    else res.json(day);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addNewEntry = async (req, res) => {
  const { festivalDay } = req.body;

  try {
    const newDay = new Day({ festivalDay: festivalDay })
    await newDay.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.editEntry = async (req, res) => {
  const { festivalDay } = req.body;

  try {
    const day = await Day.findById(req.params.id);
    if(day){
      day.festivalDay = festivalDay;
      await day.save();
      res.json(await Day.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const day = Day.findById(req.params.id);
    if(day){
      await Day.deleteOne({ _id: req.params.id });
      res.json(await Day.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};