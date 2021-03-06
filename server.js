var express = require('express');
var app = express();

var logger = require('./logger');

app.use(logger);

app.use(express.static('public'));

app.get('/people', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/people.html');
});

var availablePeople = [
  'beyonce',
  'einstein',
  'luke',
  'marie',
  'ta-nehisi'
];
app.get('/people/:person', function (req, res, next) {
  var person = req.params.person.toLowerCase();
  if (availablePeople.indexOf(person) >= 0) {
    res.status(200).sendFile(
      __dirname + '/public/people/' + person + '.html'
    );
  } else {
    next();
  }
});

app.get('/', function (req, res, next) {
  console.log("== Request for /");
  var content = "<html>";
  content += "<body>"
  content += "<h1>Welcome to our page</h1>"
  content += "</body>"
  content += "</html>"
  res.status(200).send(content);
});

app.get('/cats', function (req, res, next) {
  console.log("== Request for /cats");
  var content = "<html>";
  content += "<body>"
  content += "<h1>Welcome to our Cats page</h1>"
  content += "</body>"
  content += "</html>"
  res.status(200).send(content);
});

app.get('/photos/:user/:photoid', function (req, res, next) {
  console.log("== req.params:", req.params);

  var content = "<html>";
  content += "<body>"
  content += "<h1>Welcome to our photos page</h1>"
  content += "<p>You requested this photo: " + req.params.user + "/" + req.params.photoid + "</p>";
  content += "</body>"
  content += "</html>"
  res.status(200).send(content);
});

app.get('*', function (req, res, next) {
  res.status(404).send("This page doesn't exist: " + req.url);
});

app.listen(3001, function (err) {
  if (!err) {
    console.log("== Server listening on port 3001");
  }
});
