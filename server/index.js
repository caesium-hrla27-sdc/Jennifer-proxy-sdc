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
const ratingsServer = 'http://localhost:3003';
const similarServer = 'http://localhost:3004';
const exploreServer = 'http://localhost:3005';

app.use(cookieParser());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  let id = Math.floor(Math.random() * 100);
  res.clearCookie('id');
  res.cookie('id', id);
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.get('/productDetails', (req, res) => {
  console.log(req.cookies);
  axios
    .get(productDetailsServer + '/productDetails/' + req.cookies.id)
    .then(({ data }) => {
      res.json(data);
    })
    .catch(() => res.status(404).end());
});

app.get('/explores', (req, res) => {
  axios
    .get(exploreServer + '/explores/' + req.cookies.id)
    .then(({ data }) => {
      res.json(data);
    })
    .catch(() => res.status(404).end());
});

app.get('/similar', (req, res) => {
  axios
    .get(similarServer + '/similar/' + req.cookies.id)
    .then(({ data }) => {
      res.json(data);
    })
    .catch(() => res.status(404).end());
});

app.get('/like', (req, res) => {
  axios
    .get(similarServer + '/like/' + req.cookies.id)
    .then(({ data }) => {
      res.json(data);
    })
    .catch(() => res.status(404).end());
});

app.get('/ratings', (req, res) => {
  axios
    .get(ratingsServer + '/ratings/' + req.cookies.id)
    .then(({ data }) => {
      res.json(data);
    })
    .catch(() => res.status(404).end());
});

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(PORT, () => console.log('server listening on PORT ' + PORT));
