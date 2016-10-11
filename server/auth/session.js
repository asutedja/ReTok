var Promise = require('bluebird');
var redis = require('redis');
var client = redis.createClient();
client.on("error", function (err) {
    console.log("Error " + err);
});
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var checkSession = function(req, res, next) {
	// console.log('########## here\'s req.cookie from client: ', req.cookies.localUserId + ' ##########'); //localUserId, connect.sid
	// console.log('req.cookies from session middleware: ', req.cookies);
	// console.log('req.url from session middleware: ', req.url);
	// console.log('req.server from session middleware: ', req.method);
	var authUser = true;
	if (req.method === 'POST' || req.url === 'graphql' || req.url === 'logout') {
		next();
	}
	if (req.method === 'GET') {
		if (req.cookies['connect.sid'] === undefined || req.cookies['userID'] === undefined) {
			res.set('authUser', !authUser);
			next();
		} else if (req.cookies['connect.sid'] !== undefined && req.cookies['userID'] !== undefined) {
			res.set('authUser', authUser);
			next();
		}
	}
};

module.exports = checkSession;
