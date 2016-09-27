var express = require('express');
var GraphHTTP = require('express-graphql');
var Schema = require('./db/schema');
var app = express();
var fs = require('fs')

var https = require('https')
var privateKey  = fs.readFileSync('server/key.pem', 'utf8');
var certificate = fs.readFileSync('server/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var http = require('http').Server(app); //Should be https.  Change later after testing

var httpsServer = https.createServer(credentials, app);
var port = process.env.PORT || 3000;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var os = require('os');

var io = require('socket.io')(httpsServer);
 

app.use(express.static('client'));
app.use(express.static(__dirname + '/../client/'));

app.use('/graphql', GraphHTTP({
	schema: Schema,
	pretty: true,
	graphiql: true
}));





io.sockets.on('connection', function(socket) {


  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('connect', function(socket) {
  	log('socket has connected');
  });



  socket.on('message', function(message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

    var numClients = io.sockets.sockets.length;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    if (numClients === 1) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);

    } else if (numClients === 2) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
    } else if(numClients > 2) {
    	var user = io.sockets.adapter.rooms[room];
    	console.log(user, 'number of users', user.length);
    } else { // max two clients
      socket.emit('full', room);
    }
  });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        } 
      });
    }
  });

  socket.on('bye', function(){
    console.log('received bye');
  });



});


http.listen(port, function(data) {
  console.log('listening on ' + port);

});

httpsServer.listen(8443);


