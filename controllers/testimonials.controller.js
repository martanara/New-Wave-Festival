//testimonials.controller.js

const Testimonial = require('../models/testimonial.model');

exports.getAllEntrys = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandomEntry = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonial = await Testimonial.findOne().skip(rand);
    if(!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getEntryById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if(!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addNewEntry = async (req, res) => {
  const { author, text } = req.body;

  try {
    const newTestimonial = new Testimonial({  author, text })
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.editEntry = async (req, res) => {
  const { author, text } = req.body;

  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if(testimonial){
      testimonial.author = author;
      testimonial.text = text;
      await testimonial.save();
      res.json(await Testimonial.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const testimonial = Testimonial.findById(req.params.id);
    if(testimonial){
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json(await Testimonial.find());
    } else res.status(404).json({ message: 'Not found' })
  }
  catch(err) {
    res.status(500).json({ message : err})
  }
};