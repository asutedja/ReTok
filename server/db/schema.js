var GraphQLDate = require('graphql-date');
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLBoolean = require('graphql').GraphQLBoolean;

var Db = require('./db');

var Auth = require('../auth/auth');

var User = new GraphQLObjectType({

	name: 'User',
	description: 'User table',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve (user) {
					return user.id;
				}
			},
			username: {
				type: GraphQLString,
				resolve (user) {
					return user.username;
				}
			},
			password: {
				type: GraphQLString,
				resolve (user) {
					return user.password;
				}
			},
			firstName: {
				type: GraphQLString,
				resolve (user) {
					return user.firstName;
				}
			},			
			lastName: {
				type: GraphQLString,
				resolve (user) {
					return user.lastName;
				}
			},			
			email: {
				type: GraphQLString,
				resolve (user) {
					return user.email;
				}
			},			
			dob: {
				type: GraphQLDate,
				resolve (user) {
					return user.dob;
				}
			},			
			gender: {
				type: GraphQLString,
				resolve (user) {
					return user.gender;
				}
			},			
			profilePic: {
				type: GraphQLString,
				resolve (user) {
					return user.profilePic;
				}
			},			
			coin: {
				type: GraphQLInt,
				resolve (user) {
					return user.coin;
				}
			},
			emoji: {
				type: GraphQLString,
				resolve (user) {
					return user.emoji;
				}
			},
			online: {
				type: GraphQLBoolean,
				resolve (user) {
					return user.online;
				}
			}
		}
	}

});

var Friendship = new GraphQLObjectType({

	name: 'Friendship',
	description: 'all unique friendships',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve (friendship) {
					return friendship.id;
				}
			},
			userOne: {
				type: GraphQLInt,
				resolve (friendship) {
					return friendship.userOne;
				}
			},
			userTwo: {
				type: GraphQLInt,
				resolve (friendship) {
					return friendship.userTwo;
				}
			},
			relationship: {
				type: GraphQLInt,
				resolve (friendship) {
					return friendship.relationship;
				}
			},
			chatCount: {
				type: GraphQLInt,
				resolve (friendship) {
					return friendship.chatCount;
				}
			}
		}
	}

});

var Chat = new GraphQLObjectType({

	name: 'Chat',
	description: 'chat history log',
	fields: () => {
	return {
		id: {
			type: GraphQLInt,
			resolve (chat) {
				return chat.id;
			}
		},
		friendshipID: {
			type: GraphQLInt,
			resolve (chat) {
				return chat.friendshipID;
			}
		},
		senderID: {
			type: GraphQLInt,
			resolve (chat) {
				return chat.senderID;
			}
		},
		text: {
			type: GraphQLString,
			resolve (chat) {
				return chat.text;
			}
		},
		time: {
			type: GraphQLDate,
			resolve (chat) {
				return chat.time;
			}
		}
	}
	}

});

var Query = new GraphQLObjectType({

	name: 'Query',
	description: 'Root query object',
	fields: () => {
		return {
			users: {
				type: new GraphQLList(User),
				args: {
					id: {type: GraphQLInt},
					username: {type: GraphQLString},
					password: {type: GraphQLString},
					firstName: {type: GraphQLString},
					lastName: {type: GraphQLString},
					email: {type: GraphQLString},
					dob: {type: GraphQLDate},
					gender: {type: GraphQLString},
					profilePic: {type: GraphQLString},
					coin: {type: GraphQLInt},
					emoji: {type: GraphQLString},
					online: {type: GraphQLBoolean}
				},
				resolve (root, args) {
					return Db.User.findAll({where: args, attributes: ['id', 'username', 'firstName', 'lastName', 'email', 'dob', 'gender', 'profilePic', 'coin', 'online']});
				}
			},
			friendships: {
				type: new GraphQLList(Friendship),
				args: {
					id: {type: GraphQLInt},
					userOne: {type: GraphQLInt},
					userTwo: {type: GraphQLInt},
					relationship: {type: GraphQLInt},
					chatCount: {type: GraphQLInt}
				},
				resolve (root, args) {
					return Db.Friendship.findAll({where: args});
				}
			},
			chats: {
				type: new GraphQLList(Chat),
				args: {
					id: {type: GraphQLInt},
					friendshipID: {type: GraphQLInt},
					senderID: {type: GraphQLInt},
					text: {type: GraphQLString},
					time: {type: GraphQLDate}
				},
				resolve (root, args) {
					return Db.Chat.findAll({where: args});
				}
			},
			findFriends: {
				type: new GraphQLList(User),
				args: {
					username: {type: new GraphQLNonNull(GraphQLString)}
				},
				resolve (root, args) {

					var friends = [];
					var myself;
					return Db.User.findAll({where: args})
					.then(function(user){
						myself = user;
						// return Db.User.findAll(
						// 	{
						// 		include: [Db.FriendTwo],
						// 	}
						// );
						return Db.sequelize.query("SELECT `FriendTwo`.`id` , `FriendTwo`.`username`, `FriendTwo`.`password`, `FriendTwo`.`firstName`, `FriendTwo`.`lastName`, `FriendTwo`.`email`, `FriendTwo`.`dob`, `FriendTwo`.`gender`, `FriendTwo`.`profilePic`, `FriendTwo`.`coin`, `FriendTwo`.`online`, `FriendTwo`.`createdAt`, `FriendTwo`.`updatedAt`, `FriendTwo.Friendship`.`relationship`, `FriendTwo.Friendship`.`createdAt`, `FriendTwo.Friendship`.`updatedAt`, `FriendTwo.Friendship`.`userOne`, `FriendTwo.Friendship`.`userTwo` FROM `Users` AS `User` LEFT OUTER JOIN (`Friendships` AS `FriendTwo.Friendship` INNER JOIN `Users` AS `FriendTwo` ON `FriendTwo`.`id` = `FriendTwo.Friendship`.`userTwo`) ON `User`.`id` = `FriendTwo.Friendship`.`userOne` WHERE `FriendTwo.Friendship`.`userOne` ="+user[0].id+";");
					})
					.then(function(response){	
						if(response.length > 0) {
							response[0].forEach(function(friend){
								friends.push(friend);
							});
						}
						return friends;
					})
					.then(function(nothing){
						// 	return Db.Friendship.findAll(
						// 		{
						// 			include: [Db.FriendOne],
						// 			where: {userTwo: myself[0].id}
						// 		}
						// 	)
						return Db.sequelize.query("SELECT `FriendOne`.`id` , `FriendOne`.`username`, `FriendOne`.`password`, `FriendOne`.`firstName`, `FriendOne`.`lastName`, `FriendOne`.`email`, `FriendOne`.`dob`, `FriendOne`.`gender`, `FriendOne`.`profilePic`, `FriendOne`.`coin`, `FriendOne`.`online`, `FriendOne`.`createdAt`, `FriendOne`.`updatedAt`, `FriendOne.Friendship`.`relationship`, `FriendOne.Friendship`.`createdAt`, `FriendOne.Friendship`.`updatedAt`, `FriendOne.Friendship`.`userOne`, `FriendOne.Friendship`.`userTwo` FROM `Users` AS `User` LEFT OUTER JOIN (`Friendships` AS `FriendOne.Friendship` INNER JOIN `Users` AS `FriendOne` ON `FriendOne`.`id` = `FriendOne.Friendship`.`userOne`) ON `User`.`id` = `FriendOne.Friendship`.`userTwo` WHERE `FriendOne.Friendship`.`userTwo` ="+myself[0].id+";");
					})
					.then(function(response){	
						if(response.length > 0) {
							response[0].forEach(function(friend){
								friends.push(friend);
							});
						}
						return friends;
					})
					.catch(function(err){
						console.log("There is an error: ", err);
					});
				}
			}
		}
	}
});

var Mutation = new GraphQLObjectType({

	name: 'Mutation',
	description: 'functions to create new users, friendships and chats',
	fields: () => {
		return {
			addUser: {
				type: User,
				args: {
					username: {type: new GraphQLNonNull(GraphQLString)},
					password: {type: new GraphQLNonNull(GraphQLString)},
					firstName: {type: GraphQLString},
					lastName: {type: GraphQLString},
					email: {type: new GraphQLNonNull(GraphQLString)},
					dob: {type: GraphQLDate},
					gender: {type: GraphQLString},
					profilePic: {type: GraphQLString},
					coin: {type: GraphQLInt},
					emoji: {type: GraphQLString}
				},
				resolve (root, args) {
					return Db.User.findAll({where: {username: args.username}})
					.then(function (user) {
						if (user.length > 0) {
							return;
						} else {
							return Auth.hashPwAsync(args.password)
							.then(function (hashed) {
								return Db.User.create({
									username: args.username,
									password: hashed,
									firstName: args.firstName,
									lastName: args.lastName,
									email: args.email,
									dob: args.dob,
									gender: args.gender,
									profilePic: args.profilePic,
									coin: 0,
									emoji: 'test-emoji',
									online: true
								});
							})
						}
					})
					.catch(function (err) {
						console.log("There is an error: ", err);
					});
				}
			},
			updateUser: {
				type: User,
				args: {
					username: {type: new GraphQLNonNull(GraphQLString)},
					password: {type: GraphQLString},
					firstName: {type: GraphQLString},
					lastName: {type: GraphQLString},
					email: {type: GraphQLString},
					dob: {type: GraphQLDate},
					gender: {type: GraphQLString},
					profilePic: {type: GraphQLString},
					coin: {type: GraphQLInt},
					emoji: {type: GraphQLString},
					online: {type: GraphQLBoolean}
				},
				resolve (root, args) {
					return Db.User.update(args, {where: {username: args.username}});
				}
			},
			addFriendship: {
				type: Friendship,
				args: {
					userOne: {type: new GraphQLNonNull(GraphQLString)},
					userTwo: {type: new GraphQLNonNull(GraphQLString)},
				},
				resolve (root, args) {
					return Db.User.findAll({where: {$or: [{username: args.userOne}, {username: args.userTwo}]}})
					.then(function(users){

						Db.Friendship.create({
							userOne: users[0].id,
							userTwo: users[1].id,
							relationship: 1,
							chatCount: 0
						});
					})
					.catch(function(err){
						console.log('There is an error: ', err);
					});
				}
			},
			updateFriendship: {
				type: Friendship,
				args: {
					userOne: {type: new GraphQLNonNull(GraphQLString)},
					userTwo: {type: new GraphQLNonNull(GraphQLString)},
				},
				resolve (root, args) {
					return Db.User.findAll({where: {$or: [{username: args.userOne}, {username: args.userTwo}]}})
					.then(function(users){
						console.log("users0id---", users[0].id);
						return Db.Friendship.findAll({
							where: {
								$or: [
									{
										$and: [
											{userOne: users[0].id},
											{userTwo: users[1].id}
										]
									},
									{
										$and: [
											{userOne: users[1].id},
											{userTwo: users[0].id}
										]
									}
								]
							}
						})
					})	
					.then(function(friendship) {
						console.log("Friendship---", friendship)
						Db.Friendship.update({relationship: 0}, {where: {id: friendship[0].id}});
					})
					.catch(function(err){
						console.log('There is an error: ', err);
					});
				}
			},
		}
	}
		//TODO: addChat, delateChat
});

var Schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});

module.exports = Schema;	
