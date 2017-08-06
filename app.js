const express = require('express');
const path  = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.send("Hello world");
});
app.listen(3000)
console.log('Server is running at 3000.....');
