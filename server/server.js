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

// // configure strategy
// function verifyPassword(password, dbPassword) {
// 	if (password === dbPassword) {
// 		return true;
// 	} else {
// 		return false
// 	}
// };


// passport.use(new LocalStrategy(
// 	function(username, password, done) {
// 	// search username and password for comparison
// 		User.findAll({where: {username: username}})
// 		.then(function(user) {
// 			console.log('user: ', user);
// 			if (user.length === 0) {return done(null, false, {message: 'wrong username'});}
// 			if (!verifyPassword(password, user[0].password)) {return done(null, false, {message: 'wrong message'});}
// 			return done(null, user);
// 		});
// 	}
// ));

// passport.serializeUser(function(user, done) {
// 	console.log('user in serializeUser: ', user);
// 	done(null, user[0].id);
// });
// passport.deserializeUser(function(id, done) {
// 	console.log('id: ', id);
// 	User.findAll({where: {id: id}})
// 	.then(function(user) {
// 		console.log("done", done);
// 		done(null, user);
// 	})
// 	.catch(function(err){
// 		done(err, null);
// 	})
// });

app.use('/graphql', GraphHTTP({
	schema: Schema,
	pretty: true,
	graphiql: true
}));

app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/home',
}) ,function(req, res) {
	console.log('tried logged in');
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