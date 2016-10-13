var db = require('../server/db/db');
var auth = require('../server/auth/auth')


// add records to User table
function populateUserData(data) {
	var userData = data.map(function(name) {
		auth.hashPwAsync(name).then(function(hashed) {
			var user = {};
			user.password = hashed;
			user.username = name;
			user.firstName = name;
			user.lastName = name;
			user.email = name + '@gmail.com';
			user.coin = Math.floor(Math.random() * 1000);
			user.online = Math.random() >= 0.5 ? true : false;
			db.User.findAll({where: {username: name}})
			.then(function(foundUser) {
				if (foundUser.length > 0) {
					return;	
				} else {
					db.User.create(user); 
				}
			})
		});
	});

};

function populateFriendshipData(numOfFriend) {
	var	userOne = Math.floor(Math.random() * 100) % numOfFriend;
	var	userTwo = Math.floor(Math.random() * 100) % numOfFriend;
	while (userOne === userTwo) {
		userTwo = Math.floor(Math.random() * 100) % numOfFriend;
	}
	db.Friendship.findAll({where: {
		$or: [{$and: [{userOne: userOne}, {userTwo: userTwo}]}, {$and: [{userOne: userTwo}, {userTwo: userOne}]}]
	}}).then(function(friendship) {
		if (friendship.length > 0) {
			return;
		} else {
			db.Friendship.create({
				userOne: userOne,
				userTwo: userTwo,
				relationship: 1,
				textChatCount: Math.floor(Math.random() * 1000),
				videoChatCount: Math.floor(Math.random() * 1000),
			});
		}
	})
};


function populateEmojiData(data) {
	var price = Math.ceil(Math.random() * 1000);
	db.Emoji.create({
		emoji: data,
		price: price
	});
};

module.exports = {
	populateUserData: populateUserData,
	populateFriendshipData: populateFriendshipData,
	populateEmojiData: populateEmojiData
}
