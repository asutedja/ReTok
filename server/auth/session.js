var Promise = require('bluebird');
var redis = require('redis');
var client = redis.createClient();
client.on("error", function (err) {
    console.log("Error " + err);
});
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var checkSession = function(req, res, next) {

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
