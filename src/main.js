import express from 'express';

import Zillow from './providers/zillow.js';

const app = express();
app.use(express.json());

const zillow = new Zillow();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/zillow/:borough', (req, res) => {
  const borough = req.params.borough;
  const rentals = zillow.getRentals(borough);
  res.json(rentals);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})