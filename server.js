// server.js
// where your node app starts

// init project
const moment = require('moment-timezone')
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// setup port
const port = process.env.PORT || 3000

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// translate date
app.get('/api/:date?', (req, res) => {
  const date_string = req.params.date
  let date = undefined 

  if (!date_string) {
    date = new Date()
  } else if (/^\d+$/.test(date_string)) {
    date = new Date(parseInt(date_string))
  } else {
    date = new Date(date_string)
  }

  const timezone = moment.tz.guess()
  const unix = date.getTime()
  const utc = moment(date).tz(timezone).format('ddd, DD MMM YYYY HH:mm:ss z')

  // check if user entered valid date
  if (!date.getTime()) {
    return res.json({
      error: 'Invalid Date'
    })
  }

  res.json({
    unix,
    utc
  })
})



// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
