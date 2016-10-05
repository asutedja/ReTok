import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars';
import io from 'socket.io-client'
import FriendsListEntry from './FriendsListEntry'
// import FriendsListEntry from './FriendsListEntry.js'
import * as userActions from '../../Redux/userReducer'

class FriendsListContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  joinRoom(friend) {
    var currentRoom = this.props.room;
    var roomName = [[this.props.user.username], [friend.username]].sort().join('');
    console.log('checking roomName', roomName);

    if ( roomName === currentRoom) {
      console.log('room names are the same');
      return;
    } else {
    this.props.socket.emit('joinRoom', roomName, currentRoom, this.props.user.username);}

  }

  addHighlightClass(username) {
    console.log('hit highlightclass', username);

    if(document.getElementsByClassName('chatFriendListSelected')[0]) {
      var oldSelectedEntry = document.getElementsByClassName('chatFriendListSelected')[0];
      oldSelectedEntry.classList.remove('chatFriendListSelected');
    }

    document.getElementById(username).classList.add('chatFriendListSelected');

  }


  render() {
    return (

      <div>
        {this.props.friends.map((item, index) => <FriendsListEntry key={index} friend={item} joinRoom={this.joinRoom.bind(this)} addHighlightClass={this.addHighlightClass.bind(this)}/>)}
      </div>
      )


  }

};


function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    room: state.userReducer.room,
    socket: state.userReducer.socket,
    friends: state.userReducer.friends
  }
}

export default connect(mapStateToProps)(FriendsListContainer);


