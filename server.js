const express = require('express');
const { send } = require('express/lib/response');
const cors = require('cors');
const app = express();

let db = require('./db');

//import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
  res.status(404).send('Page not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});