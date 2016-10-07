import friendTierCalculator from './friendTierCalculator.js'
import * as userActions from './Redux/userReducer'

var tierRanking = (friends) => {
  var rankedFriends = [];
  var num = 0;
  if (friends.length <= 5) {
    num = friends.length;
  } else if (friends.length <= 20 && friends.length > 5) {
    num = Math.min(5, friends.length);
  } else {
    num = Math.min(10, friends.length);
  }
  for (var i = 0; i < num; i++) {
    rankedFriends.push(friends[i]);
  }
  return rankedFriends;
}

var updateHelper = (context) => {
		console.log('updating', context.props.user.username)

		let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
      let options = {

        method: 'POST',
        headers: myHeaders,
        body: `
          { 
            
            findFriends(username: \"${context.props.user.username}\")
            {
                  username
                  profilePic
                  firstName
                  lastName
                  email
                  online
                  videoChatCount
                  textChatCount
                  lastChatTime
                }
          }`

      };
      fetch('/graphql', options).then((res) =>{
        return res.json().then((data) => {
          //console.log('checking my friends data',data.data.findFriends);
          var friends = data.data.findFriends;
          // friendRanking() added score to each friend
          if(friends) {
            friendTierCalculator(friends);
            var onlineFriends = friends.filter(friend => friend.online === true);
            var suggestedFriends = tierRanking(onlineFriends.slice().sort((friend0, friend1) => {return friend1.score - friend0.score}));
            context.props.dispatch(userActions.updateFriends(friends.slice()));
            context.props.dispatch(userActions.updateOnlineFriends(onlineFriends.slice()));
            context.props.dispatch(userActions.updateSuggestedFriends(suggestedFriends.slice()));
            context.props.dispatch(userActions.updateFriendCount(friends.length));
          }
        })
      })
}

export default updateHelper;