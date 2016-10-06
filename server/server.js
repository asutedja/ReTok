var express = require('express');
var GraphHTTP = require('express-graphql');
var session = require('express-session');
var User = require('./db/db').User;
var Friendship = require('./db/db').Friendship;
var app = express();
var http = require('http').Server(app); //Should be https.  Change later after testing
var port = process.env.PORT || 3000;
var Schema = require('./db/Schema');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var bodyParser = require('body-parser');
var sockets = {};

var cors = require('cors');
require('./auth/auth');

var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync(__dirname + '/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);

//Signaling server for MultiRTCConnection Library
var os = require('os');
var io = require('socket.io')(httpsServer);
require('./Signaling-Server.js')(httpsServer, function(socket) {}, io);


app.use(express.static('client'));
app.use(express.static(__dirname + '/../client/'));
app.use(session({secret: 'lets ReTok'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());


var uploadPhoto = ('./db/uploadPhoto');
require('./db/uploadPhoto')(app);

app.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
app.use(/\/((?!graphql).)*/, bodyParser.json());

// app.use(bodyparser.json());

app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.post('/test', function(req, res) {
// 	console.log('checking req body', req.body);
// });

// app.post('/login', passport.authenticate('local', {
//   // successRedirect: '/',
//   failureRedirect: '/',
// }) ,function(req, res) {
//   var userID = req.session.passport.user;
//   console.log('checking my request over here -------->', req.session.passport.user);


//   User.findAll({where:{id: userID}}).then(function(user) {
//     console.log('confirming i have user information', user);
//     res.status(200).send(user);
//   });

// });

app.post('/login', passport.authenticate('local', {
 // successRedirect: '/',
 //failureRedirect: '/',
}) ,function(req, res) {

 var userID = req.session.passport.user;
 console.log('checking my request over here -------->', req.session);
 // var returnedData = {};
 // User.findAll({where:{id: userID}}).then(function(user) {
 //   console.log('confirming i have user information', user);
 //   returnedData.user = user;
 //   Friendship.findAll({where: {$or:[{userOne: userID}, {userTwo: userID}]}}).then(function(friendship) {
 //     returnedData.friendship = friendship;
 //     console.log('checking my returned data from server --->', returnedData);
 //     res.status(200).send(returnedData);
 //   });
 User.findAll({where:{id: userID}}).then(function(user) {
    res.status(200).send(user);
 });
});

io.sockets.on('connection', function(socket) {

  socket.on('textmessagemount', function() {
    console.log('i hit the textmessagemount.');
  });

  socket.on('textmessagesent', function(message, room) {
    console.log('textmessagesent on server side --->', message, room);
    // socket.broadcast('textmessagereceived', message);
    io.sockets.in(room).emit('textmessagereceived', message);
  });

  socket.on('joinRoom', function(room, oldRoom, username) {
    console.log('joinRoom on server side --->', room);

    // socket.broadcast('textmessagereceived', message);
    if (oldRoom !== username) {
      socket.leave(oldRoom);
      console.log('leaving room', oldRoom);
    }

    socket.join(room);
    console.log('joinRoom on server side now --->', room);


    io.sockets.in(room).emit('joinRoomSuccess', room);
  });


  console.log('Socket Connected =-------==============')


  socket.on('leavetextchatview', function(room, username) {
    console.log('hit leavetextchatview');
    if (room !== username) {
      socket.leave(room);
      console.log('view dismounted. leaving room -->', room);
    }

  });


  socket.on('login', function(user) {
    sockets[user] = socket.id; 
    log('this is the room you are in: ', user)
    socket.name = user;
    console.log('ROOM NAME IS', user)
    socket.join(user);
  })

  socket.on('calling', function(info) {
      var id = sockets[info.user];
      console.log('person calling', info);
      io.sockets.connected[id].emit('invite',info)    
  })


  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('connection', function(socket) {
  	log('socket has connected');
  });

  socket.on('message', function(message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    if(message.room) {
      io.to(message.room).emit('message', message.sessionDescription);  
    }
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

    var numClients = Object.keys(io.sockets.adapter.rooms[room]).length;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');
    //socket.emit('created', room, socket.id);
    if (numClients === 2 && sockets[room] !== socket.id) {
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.join(room);
      io.sockets.in(room).emit('join', room);
      io.sockets.in(room).emit('ready');

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

  //Socket for updating profile with online/offline and new friends
  socket.on('updateFriends', function(friends) {
    var updateUsers = [];
    console.log('updating from server--------------------------------------------------------------')
    friends.forEach(function(friend) {
      var id = sockets[friend.username]
      if(sockets[friend.username]) {
        io.sockets.connected[id].emit('update')    
      }
    })
  })

  socket.on('disconnect', function() {
    console.log('socket disconnected')
    for(var key in sockets) {
      if (sockets[key] === socket.id) {
        sockets[key] = null;
      }
    }

  }) 

  socket.on('bye', function(){
    console.log('received bye');
  });


});

app.get('/logout', function (req, res){
	req.logout();
});

http.listen(port, function(data) {
  console.log('listening on ' + port);

});


httpsServer.listen(8443);