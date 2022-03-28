const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');

const db = require('../db');

// get all posts
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const { id } = req.params;
  const found = db.concerts.find(el => el.id === parseInt(id));
  res.json(found);
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day } = req.body;

  db.concerts.push({ id: uuidv4(), performer, genre, price, day })

  res.status(200).json({
    message: 'added',
    data: db.concerts,
  });
});

router.route('/concerts/:id').put((req, res) => {
  const { id } = req.params;
  const found = db.concerts.find(el => el.id === parseInt(id));

  if (found) {
    db.concerts = db.concerts.map(el =>
      el.id == id ? { ...el, ...req.body } : el
    );
    res.status(200).json({
      message: 'modified',
      data: db.concerts,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const { id } = req.params;

  const found = db.concerts.find(el => el.id === parseInt(id));
  const index = db.concerts.indexOf(found);

  if (found) {
    db.concerts.splice(index, 1);
    res.status(200).json({
      message: 'deleted',
      data: db.concerts,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

module.exports = router;