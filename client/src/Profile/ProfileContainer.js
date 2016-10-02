import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
import Profile from './Profile.js'
import * as userActions from '../Redux/userReducer'
import io from 'socket.io-client'

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('checking my props', this.props.user.username);
    var socket = this.props.socket
    socket.emit('login', this.props.user.username)
    var username = this.props.user.username
    //Logic to update users friends as they login/logout and add new friends
    socket.on('update', function() {
      console.log('updating', username);
      let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
      let options = {

        method: 'POST',
        headers: myHeaders,
        body: `
          { 
            
            findFriends(username: \"${username}\")
            {
                  username
                  password
                  profilePic
                  firstName
                  lastName
                  email
                  online
                }
          }`

      };
      fetch('/graphql', options).then((res) =>{
        return res.json().then((data) => {
          console.log('checking my friends data',data.data.findFriends);
          var friends = data.data.findFriends;
          if(friends) {
            var onlineFriends = friends.filter(friend => friend.online === true);
            this.props.dispatch(userActions.updateFriends(friends.slice()));
            this.props.dispatch(userActions.updateOnlineFriends(onlineFriends.slice()));
            this.props.dispatch(userActions.updateFriendCount(friends.length));
          }
        })
      })
    }.bind(this))
  }

  render() {
    return (
      <div>
        <Profile user = {this.props.user}     friendCount={this.props.friendCount}/>
        {this.props.children}
      </div>
    )
  }
}

//testing1234
function mapStateToProps(state) {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user,
    socket: state.userReducer.socket,
    friendCount: state.userReducer.friendCount
  }
}

ProfileContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(ProfileContainer)
