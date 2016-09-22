var express = require('express');
var app = express();
var https = require('https').Server(app);
var port = process.env.PORT || 3000;

app.use(express.static('client'));
app.use('/static', express.static(__dirname + '/../client'));


app.get('/', function(req, res) {
	res.status(200).send('I am sending back!');
})

app.post('/', function(req, res) {
	res.status(201).end('You posted!');
})






https.listen(port, function(data) {
  console.log('listening on ' + port);

});