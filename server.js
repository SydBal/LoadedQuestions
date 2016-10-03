// Server for Loaded Questions website
var path    = require('path'),
    express = require('express'),
    app     = express(),
    http    = require('http').createServer(app);

// Serve index
app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

http.listen(3000, function(){
  console.log('Loaded Questions serving! Listening on *:3000 for http requests.');
});