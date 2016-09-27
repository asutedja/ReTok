//establish database connection
//CHANGE PASSWORD IN SETTINGS.JS IF NEEDED
var Sequelize = require('sequelize');
var userinfo = require('../../settings.js');
var sequelize = new Sequelize('ReTok', userinfo.user, userinfo.password);

//define user model
var User = sequelize.define('User', {
	
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	firstName: Sequelize.STRING,
	lastName: Sequelize.STRING,
	email: Sequelize.STRING,
	dob: Sequelize.DATE,
	gender: Sequelize.STRING,
	profilePic: Sequelize.STRING,
	coin: Sequelize.INTEGER,
	emoji: Sequelize.STRING,

});

//friendship model stores all friendships and related information
var Friendship = sequelize.define('Friendship', {

	userOne: Sequelize.INTEGER,
	userTwo: Sequelize.INTEGER,
	relationship: Sequelize.INTEGER,
	chatCount: Sequelize.INTEGER

});

// chat model stores all chat histories
var Chat = sequelize.define('Chat', {

	friendshipID: Sequelize.INTEGER,
	senderID: Sequelize.INTEGER,
	text: Sequelize.STRING,
	time: Sequelize.DATE

});

User.sync();
Friendship.sync();
Chat.sync();

module.exports.sequelize = sequelize;
module.exports.User = User;
module.exports.Friendship = Friendship;
module.exports.Chat = Chat;


