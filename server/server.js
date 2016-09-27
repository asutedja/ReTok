var express = require('express');
var GraphHTTP = require('express-graphql');
var session = require('express-session');
var User = require('./db/db').User;
var app = express();
var http = require('http').Server(app); //Should be https.  Change later after testing
var port = process.env.PORT || 3000;
var Schema = require('./db/Schema');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('./auth/auth');

app.use(express.static('client'));
app.use(express.static(__dirname + '/../client/'));
app.use(session({secret: 'lets ReTok'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', GraphHTTP({
	schema: Schema,
	pretty: true,
	graphiql: true
}));

app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/home',
}) ,function(req, res) {
	res.status(200).send('welcome');
	// res.redirect('/profile/' + req.user.username);
});

app.get('/logout', function (req, res){
	req.logout();
	res.redirect('/');
});

http.listen(port, function(data) {
  console.log('listening on ' + port);

});