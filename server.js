const express = require('express');
const { send } = require('express/lib/response');
const app = express();

const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const found = db.find(el => el.id === parseInt(id));
  res.json(found);
});

app.get('/testimonials/random', (req, res) => {
  //const random = Math.floor(Math.random() * db.length)
  // res.json(db[random]);

  res.json(db);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  db.push({ id: uuidv4(), author, text })

  res.status(200).json({
    message: 'added',
    data: db,
  });
});

app.put('/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const found = db.find(el => el.id === parseInt(id));

  if (found) {
    db = db.map(el =>
      el.id == id ? { ...el, ...req.body } : el
    );
    res.status(200).json({
      message: 'modified',
      data: db,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const { id } = req.params;

  const found = db.find(el => el.id === parseInt(id));
  const index = db.indexOf(found);

  if (found) {
    db.splice(index, 1);
    res.status(200).json({
      message: 'deleted',
      data: db,
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