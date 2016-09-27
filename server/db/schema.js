// import {
// 	GraphQLObjectType,
//  	GraphQLString,
//  	GraphQLInt,
// 	GraphQLSchema,
// 	GraphQLList,
// 	GraphQLNonNull
// } from 'graphql';

// //import date type separately
// import GraphQLDate from 'graphql-date';

// import Db from './db';

var GraphQLDate = require('graphql-date');
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;

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
					emoji: {type: GraphQLString}
				},
				resolve (root, args) {
					return Db.User.findAll({where: args});
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
							emoji: 'test-emoji'
						});
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
					emoji: {type: GraphQLString}
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
							relationship: 0,
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
						Db.Friendship.update({relationship: 1}, {where: {id: friendship[0].id}});
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
