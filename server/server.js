var express = require('express');
var app = express();
var http = require('http').Server(app); //Should be https.  Change later after testing
var port = process.env.PORT || 3000;

app.use(express.static('client'));
app.use(express.static(__dirname + '/../client/'));



// app.get('/', function(req, res) {
// 	res.status(200).send('I am sending back!');
// })

// app.post('/', function(req, res) {
// 	res.status(201).end('You posted!');
// })






http.listen(port, function(data) {
  console.log('listening on ' + port);

});