const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

const stripe = require('stripe')('sk_test_mcNfM3pMtOt5dNeU4FFRfFlw');

app.use(express.static('public'))

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function (req, res) {
  console.log(process.env.EMAIL_PASSWORD);
  res.render('index')
})
app.post('/submit-order', function (req, res) {
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tinybowmail@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const html_string =
  "email: " + req.body.email + "<br />"
  + "first name: " + req.body.firstname + "<br />"
  + "last name: " + req.body.lastname + "<br />"
  + "address 1: " + req.body.address1 + "<br />"
  + "address 2: " + req.body.address2 + "<br />"
  + "country: " + req.body.country + "<br />"
  + "postcode: " + req.body.postcode + "<br />"
  + "additional information: " + req.body.additionalinformation + "<br />"

  const mailOptions = {
    from: 'tinybowmail@gmail.com',
    to: 'tinybowmail@gmail.com',
    subject: 'Incomming Order ' + Math.random().toString(36).substring(7),
    html: html_string
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('Im sorry something has gone wrong with sending your order')
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8PG4TQCUJA8A4');
    }
  });
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))
