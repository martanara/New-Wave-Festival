const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');

const db = require('../db');

// get all posts
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const { id } = req.params;
  const found = db.seats.find(el => el.id === parseInt(id));
  res.json(found);
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  const isTaken = db.seats.some(dbSeat => dbSeat.day === day && dbSeat.seat === seat)

  console.log(isTaken)

  if(!isTaken){
    db.seats.push({ id: uuidv4(), day, seat, client, email })

    res.status(409).json({
    message: 'The slot is already taken...',
  });
  } else {
    res.status(200).json({
      message: 'added',
      data: db.seats,
    });
  }
});

router.route('/seats/:id').put((req, res) => {
  const { id } = req.params;
  const found = db.seats.find(el => el.id === parseInt(id));

  if (found) {
    db.seats = db.seats.map(el =>
      el.id == id ? { ...el, ...req.body } : el
    );
    res.status(200).json({
      message: 'modified',
      data: db.seats,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.route('/seats/:id').delete((req, res) => {
  const { id } = req.params;

  const found = db.seats.find(el => el.id === parseInt(id));
  const index = db.seats.indexOf(found);

  if (found) {
    db.seats.splice(index, 1);
    res.status(200).json({
      message: 'deleted',
      data: db.seats,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

module.exports = router;
