var express = require('express');
var GraphHTTP = require('express-graphql');
var session = require('express-session');
var Schema = require('./db/schema');
var app = express();
var http = require('http').Server(app); //Should be https.  Change later after testing
var port = process.env.PORT || 3000;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(express.static('client'));
app.use(express.static(__dirname + '/../client/'));
app.use(session({secret: 'lets ReTok'}))
app.use(passport.initialize());
app.use(passport.session());

// configure strategy
passport.use(new LocalStrategy(
	function(username, password, done) {
	// search username and password for comparing
		User.findOne({username: username}, function(err, user) {
			if (err) {return done(err);}
			if (!user) {return done(null, false);}
			if (!user.verifyPassword(password)) {return done(null, false);}
			return done(null, user);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	})
});

app.use('/graphql', GraphHTTP({
	schema: Schema,
	pretty: true,
	graphiql: true
}));

app.post('/login', passport.authenticate('local', {
	failureFlash: 'Invalid Username/Password!!',
	failureRedirect: '/login',
}) ,function(req, res) {
	res.redirect('/profile/' + req.user.username);
});












// app.get('/', function(req, res) {
// 	res.status(200).send('I am sending back!');
// })

// app.post('/', function(req, res) {
// 	res.status(201).end('You posted!');
// })

http.listen(port, function(data) {
  console.log('listening on ' + port);

});