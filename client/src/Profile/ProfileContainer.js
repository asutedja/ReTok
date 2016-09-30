import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
import Profile from './Profile.js'
import * as userActions from '../Redux/userReducer'

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('checking my props', this.props);
    var socket = this.props.socket

    socket.emit('login', this.props.user)
  }

  render() {
    return (
      <div>
        <Profile user = {this.props.user}/>
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
    socket: state.userReducer.socket
  }
}

ProfileContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(ProfileContainer)
