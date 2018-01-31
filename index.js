const express = require('express')
const app = express()
const bodyParser = require('body-parser')

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
  res.send('POST request to the homepage')
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tinybowmail@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))
