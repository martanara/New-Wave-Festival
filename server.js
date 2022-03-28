const express = require('express');
const { send } = require('express/lib/response');
const cors = require('cors');
const app = express();

let db = require('./db');

const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const found = db.testimonials.find(el => el.id === parseInt(id));
  res.json(found);
});

app.get('/testimonials/random', (req, res) => {
  console.log(db.testimonials)
  //const random = Math.floor(Math.random() * db.length)
  // res.json(db[random]);

  res.status(200).json({
    message: 'added',
    data: db.testimonials,
  });
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  db.testimonials.push({ id: uuidv4(), author, text })

  res.status(200).json({
    message: 'added',
    data: db.testimonials,
  });
});

app.put('/testimonials/:id', (req, res) => {
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

app.delete('/testimonials/:id', (req, res) => {
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

app.use((req, res) => {
  res.status(404).send('Page not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});