const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

const productDetailsServer = 'http://localhost:3002';
const exploreServer = 'http://localhost:3004';
const similarServer = 'http://localhost:3005';
const reviewsServer = 'http://localhost:3003';

app.use(cookieParser());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use('/', (req, res) => {
  let id = Math.floor(Math.random() * 100);
  res.clearCookie('id');
  res.cookie({ id });
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.use('/productDetails', (req, res) => {
  console.log(req.cookies);
  axios.get(productDetailsServer + '/' + req.cookies.id).then(({ data }) => {
    res.json(data);
  });
});

app.use('/explore', (req, res) => {
  axios.get(exploreServer + '/' + req.cookies.id).then(({ data }) => {
    res.json(data);
  });
});

app.use('/similar', (req, res) => {
  axios.get(similarServer + '/' + req.cookies.id).then(({ data }) => {
    res.json(data);
  });
});

app.use('/reviews', (req, res) => {
  axios.get(reviewsServer + '/' + req.cookies.id).then(({ data }) => {
    res.json(data);
  });
});

app.listen(PORT, () => console.log('server listening on PORT ' + PORT));
