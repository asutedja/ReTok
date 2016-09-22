var express = require('express');
var app = express();
var http = require('http').Server(app); //Should be https.  Change later after testing
var port = process.env.PORT || 3000;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


app.use(express.static('client'));
app.use(express.static(__dirname + '/../client/'));




http.listen(port, function(data) {
  console.log('listening on ' + port);

});