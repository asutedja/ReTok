var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../db/db').User;
var session = require('express-session');

// configure strategy
function verifyPassword(password, dbPassword) {
	if (password === dbPassword) {
		return true;
	} else {
		return false
	}
};

passport.use(new LocalStrategy(
	function(username, password, done) {
	// search username and password for comparison
		User.findAll({where: {username: username}})
		.then(function(user) {
			console.log('user: ', user);
			if (user.length === 0) {return done(null, false, {message: 'wrong username'});}
			if (!verifyPassword(password, user[0].password)) {return done(null, false, {message: 'wrong message'});}
			return done(null, user);
		});
	}
));

passport.serializeUser(function(user, done) {
	console.log('user in serializeUser: ', user);
	done(null, user[0].id);
});

passport.deserializeUser(function(id, done) {
	console.log('id: ', id);
	User.findAll({where: {id: id}})
	.then(function(user) {
		console.log("done", done);
		done(null, user);
	})
	.catch(function(err){
		done(err, null);
	})
});
