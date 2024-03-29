// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", function (req, res) {
  const userInfo = { ipaddress: undefined, language: undefined, software: undefined };
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];;

  userInfo.ipaddress = ipAddress;
  userInfo.language = language;
  userInfo.software = software;

  if (ipAddress) {
    res.json(userInfo);
  } else {
    res.json({ error : "Error" });
  }
});

// listen for requests
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is here: ' + `http://localhost:${listener.address().port}`);
});
