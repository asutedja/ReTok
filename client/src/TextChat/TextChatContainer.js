import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars';
import io from 'socket.io-client'
import TextChat from './TextChat.js'
import FriendsListContainer from './FriendsList/FriendsListContainer.js'
import EmojiChatContainer from './EmojiChatContainer/EmojiChatContainer.js'

import * as userActions from '../Redux/userReducer'

class TextChatContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chat: []
    };
  }

  componentDidMount() {
    var context = this;
    var socket = this.props.socket;
    console.log('what is my room', this.props.room);
    console.log('what is socket', this.props.socket);
    socket.emit('textmessagemount');


    socket.on('textmessagereceived', function(message) {
      console.log('i hit textmessagereceived on client side');
      var chat = context.state.chat;
      chat.push(message);
      context.setState({
        chat:chat
      })

    });

    socket.on('joinRoomSuccess', function(room) {
      console.log('i hit joinRoomSuccess', room);
      context.props.dispatch(userActions.createRoom(room));
      console.log('i successfuly dispatched CreateRoom', context.props.room);
    })
  }

  sendChat(message) {
    console.log('i am receiving a message', message);
    message = this.props.user.username+": "+message;
    this.props.socket.emit('textmessagesent', message, this.props.room);
  }




  render() {

    var context = this;
    var chat = context.state.chat.map((message) => <div className="oneChatMessage">{message}</div>);

    return (
      <div>
        <div>
        <Scrollbars style={{ height: 50 }}>
          <EmojiChatContainer/>
        </Scrollbars>
        </div>

          <div className="chatFriendsList">
            <Scrollbars style={{ height: 700 }}>
              <FriendsListContainer/>
            </Scrollbars>
          </div>

        <div>
          <div className="chatWindow">
            <Scrollbars style={{ height: 700 }}>

              {chat}

            </Scrollbars>
          </div>
          <div className="chatInputWindow">
            <form id="chatInput" onSubmit={(e)=>{e.preventDefault(); this.sendChat(document.getElementById("chatInputField").value); document.getElementById("chatInput").reset();}}>
              <input id="chatInputField"/>
              <button className="textChatButton">
                Send Chat
              </button>
            </form>
          </div>
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
    friends: state.userReducer.friends
  }
}

export default connect(mapStateToProps)(TextChatContainer);

// {this.props.friends.map((item, index) => <TextChat key={index} friend={item}/>)}