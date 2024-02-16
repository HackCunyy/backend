import express from 'express';

import { getRentals } from './zillow.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/zillow/:borough', (req, res) => {
  const borough = req.params.borough;
  const rentals = getRentals(borough);
  res.json(rentals);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})