// Server for Loaded Questions website
var path    = require('path'),
    express = require('express'),
    app     = express(),
    http    = require('http').createServer(app);

// Serve static files
app.use('/public', express.static(path.join(__dirname + '/public/')));

// Serve index
app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

//for heroku
var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('Loaded Questions serving! Listening on *:3000 for http requests.');
});