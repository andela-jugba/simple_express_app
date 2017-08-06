const express = require('express');
const path  = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render("index", {title: 'Welcome'});
});
app.get('/about', function(req, res) {
  res.render("about");
});
app.get('/contact', function(req, res) {
  res.render("contact");
});
app.post('/contact/send', function(req, res) {
  let tranporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '',
      pass: ''
    }
  });
  let mailOptions = {
    from: 'Josh <justjosh001@gmail.com>',
    to: 'joshua.ugba@andela.com',
    subject: 'Website Submission',
    text: 'You have a Submission with the following details..Name: '+req.body.name+' Email: '+req.body.email + ' Message: ' +req.body.message,
    html: '<p>You have a Submission with the following details..</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email + '</li><li> Message: '+ req.body.message+'</li></ul>'
  }
  tranporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.redirect('/');
    }else {
      console.log('Message Sent: ' + info.response);
      res.redirect('/');
    }
  })
});

app.listen(3000)
console.log('Server is running at 3000.....');
