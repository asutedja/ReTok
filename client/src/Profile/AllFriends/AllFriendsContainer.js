import React, { PropTypes }  from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import * as userActions from '../../Redux/userReducer'
import AllFriends from './AllFriends.js'
import updateHelper from '../../updateHelper.js'


class AllFriendsContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    var socket = this.props.socket
    console.log('i hit all friends container', this.props.friends);
    // socket.on('update', () => updateHelper(this))
    // updateHelper(this);

  }

  render() {
    return (
      <div className= "AllFriendsContainer">
      {this.props.friends.map((item, index) => <AllFriends key={index} friend={item}/>)}
      </div>
      )
  }
}


function mapStateToProps(state) {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user,
    friends: state.userReducer.friends,
    socket: state.userReducer.socket
  }
}



export default connect(mapStateToProps)(AllFriendsContainer)

// export default AllFriendsContainer