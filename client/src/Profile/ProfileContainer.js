
import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
import Profile from './Profile.js'
import * as userActions from '../Redux/userReducer'
import axios from 'axios';
import updateHelper from '../updateHelper.js'


class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var context = this;
    axios.get('/auth')
      .then(function(res) {
        console.log('checking auth res data',res.data);
        if(!res.data) {
          console.log('no session...redirecting to sign up page');
          context.context.router.push('/');
        }
      })

    console.log('checking my props', this.props.user.username);
    var socket = this.props.socket
    socket.emit('login', this.props.user.username)
    socket.emit('updateFriends', this.props.friends);
    var username = this.props.user.username
    //Logic to update users friends as they login/logout and add new friends
    // socket.on('update', () => updateHelper(this))
    // updateHelper(this);
    console.log(this.props.user);
  }

  goToUploadView() {
    console.log('hit goToUploadView');
    this.context.router.push('/upload');
  }

  render() {
    return (
      <div>
        <Profile user = {this.props.user} friendCount={this.props.friendCount} goToUploadView={this.goToUploadView.bind(this)}/>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user,
    socket: state.userReducer.socket,
    friendCount: state.userReducer.friendCount,
    friends: state.userReducer.friends,
  }
}

ProfileContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(ProfileContainer)