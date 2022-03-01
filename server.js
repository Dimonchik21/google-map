const express = require('express');
const cors = require('cors');
const app = express();
const GooglePlaceProvider = require('google-place-provider').default;
require('dotenv').config();

const apiKey = process.env.REACT_APP_API_KEY; // define API key

app.use(cors());
app.options('*', cors());

app.get('/', async (req, res) => {
  const googlePlace = new GooglePlaceProvider(apiKey);
  const requestTextSearch = {
    query: '',
    radius: 500,
    pagetoken: req.query.pagetoken,
    type: ['restaurant']
  };
  const textSearch = await googlePlace.textSearch(requestTextSearch);
  res.json(textSearch);
});

app.get('/placeDetail/:place_id', async (req, res) => {
  const googlePlace = new GooglePlaceProvider(apiKey);
  const requestPlace = {
    place_id: req.params.place_id,
  };
  const placeDetail = await googlePlace.placeDetails(requestPlace);
  res.json(placeDetail);
});

app.listen(3333, () => {
  console.log('Application listening on port 3333!');
});