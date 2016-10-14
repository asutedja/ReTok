import React, {PropTypes} from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars';
import FriendsListEntry from './FriendsListEntry'
import * as userActions from '../../Redux/userReducer'
import OfflineFriendsListEntry from './OfflineFriendsListEntry'
import EmojiChatContainer from '../EmojiChatContainer/EmojiChatContainer'


class FriendsListContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  joinRoom(friend) {
    let currentRoom = this.props.room;
    
    let roomNameSort = [[this.props.user.username], [friend.username]].sort();

    let roomName=',';

    for (var i = 0; i < roomNameSort.length; i++) {
      roomName+= roomNameSort[i] +",";
    }

 
    if ( roomName === currentRoom) {

      return;
    } else {
    this.props.socket.emit('joinRoom', roomName, currentRoom, this.props.user.username, friend);}

  }

  addHighlightClass(username) {

    if(document.getElementsByClassName('chatFriendListSelected')[0]) {
      var oldSelectedEntry = document.getElementsByClassName('chatFriendListSelected')[0];
      oldSelectedEntry.classList.remove('chatFriendListSelected');
    }

    document.getElementById(username).classList.add('chatFriendListSelected');

  }


  videoChat(friend) {

    let socket = this.props.socket;
    let updatedCoin = this.props.user.coin + friend.score;
    let userCopy = Object.assign({},this.props.user, {coin: updatedCoin});
    this.props.dispatch(userActions.updateUser(userCopy));
    socket.emit('endTextChat', this.props.user.username, this.props.user.coin);

    let info = {user: friend.username, caller: this.props.user.username}
    this.props.dispatch(userActions.createRoom(this.props.user.username))
    socket.emit('calling', info);
    this.context.router.push('/chat')


  } 



  render() {

    var offline = this.props.friends.filter((item, index) => item.online === false);
    var suggestedFriends = this.props.suggestedFriends;
    var onlineFriends = this.props.onlineFriends.filter(friend => !suggestedFriends.includes(friend));
    return (

      <div className="chatListContainer">
        <div className= "chatFriendsHeader" onClick={()=>{this.props.goToProfile();}}>
          <h4>My Username is: {this.props.user.username}</h4>
        </div>
        <div className= "chatFriendsHeader">
          <h4><b>Suggested: </b></h4>
        </div>
        {this.props.suggestedFriends.map((item, index) => <FriendsListEntry key={index} videoChat={this.videoChat.bind(this)} friend={item} joinRoom={this.joinRoom.bind(this)} room={this.props.room} addHighlightClass={this.addHighlightClass.bind(this)}/>)}
        <div className= "chatFriendsHeader">
          <h4><b>Online: </b></h4>
        </div>
        
        {onlineFriends.map((item, index) => <FriendsListEntry key={index} videoChat={this.videoChat.bind(this)} friend={item} joinRoom={this.joinRoom.bind(this)} room={this.props.room} addHighlightClass={this.addHighlightClass.bind(this)}/>)}
          <div className ="chatFriendsHeader">
            <h4><b>Offline:</b></h4>
          </div>
              {offline.map((item, index) => <OfflineFriendsListEntry key={index} friend={item} joinRoom={this.joinRoom.bind(this)} room={this.props.room} addHighlightClass={this.addHighlightClass.bind(this)}/>)}
          <div className="EmojiListChat">
          <Scrollbars style={{ height: 100 }}>
            <EmojiChatContainer/>
          </Scrollbars>
          </div>
      </div>
      )


  }

};


function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    room: state.userReducer.room,
    socket: state.userReducer.socket,
    friends: state.userReducer.friends,
    onlineFriends: state.userReducer.onlineFriends,
    chatLog: state.userReducer.chatLog,
    currentChat: state.userReducer.currentChat,
    friendCount: state.userReducer.friendCount,
    suggestedFriends: state.userReducer.suggestedFriends
  }
}

FriendsListContainer.contextTypes = {
  router: PropTypes.object.isRequired
}


export default connect(mapStateToProps)(FriendsListContainer);
