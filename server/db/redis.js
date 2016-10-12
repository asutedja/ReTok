var redis = require('redis');
var Promise = require('bluebird');
var client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var archiveCode = '#^';
var redisLimit = 50;
var redisArchive = 30;

module.exports.client = client;
module.exports.archiveCode = archiveCode;
module.exports.redisLimit = redisLimit;
module.exports.redisArchive = redisArchive;