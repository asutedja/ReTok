import React, { PropTypes }  from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import OnlineFriends from './OnlineFriends.js'
import * as userActions from '../../Redux/userReducer'


class OnlineFriendsContainer extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
    console.log('i hit this component for onlinefriends')
  }

  videoChat(friend) {
    console.log('i hit video chat for this friend', friend.username);

    var socket = this.props.socket;

    var info = {user: friend.username, caller: this.props.user.username}
    this.props.dispatch(userActions.createRoom(this.props.user.username))
    socket.emit('calling', info);
    this.context.router.push('/chat')


  } 

  render() {
    return (
      <div className="AllFriendsContainer">
        {this.props.onlineFriends.map((item, index) => <OnlineFriends key={index} friend={item} videoChat={this.videoChat.bind(this)}/>)}
      </div>
      )
  }
}

OnlineFriendsContainer.contextTypes = {
  router: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user,
    onlineFriends: state.userReducer.onlineFriends,
    socket: state.userReducer.socket
  }
}


export default connect(mapStateToProps)(OnlineFriendsContainer)