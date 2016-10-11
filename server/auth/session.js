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
	console.log('req.cookies from session middleware: ', req.cookies);
	// if (req.cookies['connect.sid'] === undefined) {
	// 	res.redirect('/')
	// }
	res.redirect('/somewhere');

	next();
};

module.exports = checkSession;
