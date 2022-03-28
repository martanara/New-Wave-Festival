const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');

const db = require('../db');

// get all posts
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const random = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[random]);
});

router.route('/testimonials/:id').get((req, res) => {
  const { id } = req.params;
  const found = db.testimonials.find(el => el.id === parseInt(id));
  res.json(found);
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  db.testimonials.push({ id: uuidv4(), author, text })

  res.status(200).json({
    message: 'added',
    data: db.testimonials,
  });
});

router.route('/testimonials/:id').put((req, res) => {
  const { id } = req.params;
  const found = db.testimonials.find(el => el.id === parseInt(id));

  if (found) {
    db.testimonials = db.testimonials.map(el =>
      el.id == id ? { ...el, ...req.body } : el
    );
    res.status(200).json({
      message: 'modified',
      data: db.testimonials,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const { id } = req.params;

  const found = db.testimonials.find(el => el.id === parseInt(id));
  const index = db.testimonials.indexOf(found);

  if (found) {
    db.testimonials.splice(index, 1);
    res.status(200).json({
      message: 'deleted',
      data: db.testimonials,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

module.exports = router;