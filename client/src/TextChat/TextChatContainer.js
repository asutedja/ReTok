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
      chatSelected: false,
      currentFriend: null
    }

  }

  componentWillMount() {
    this.props.dispatch(userActions.createRoom(''));
    console.log('checking current chat --->', this.props.currentChat);
    console.log('checking  chatlog on mount --->', this.props.chatLog);

    var context = this;
    var socket = this.props.socket;

    var chatLogCopy = Object.assign({}, this.props.chatLog);


    socket.on('textmessagereceived', function(message) {
   
      var chat = context.props.currentChat.slice();
      chat.push(message);

   

      context.props.dispatch(userActions.updateCurrentChat(chat));

      var logCopy = Object.assign({}, context.props.chatLog);

      logCopy[context.props.room] = chat;

      context.props.dispatch(userActions.updateChatLog(logCopy));

  
    });

    socket.on('joinRoomSuccess', function(room, friend) {
      context.setState({
        chatSelected: true,
        currentFriend: friend
      })
      console.log('checking joinroom success chatlog', context.props.chatLog);

      var oldRoom = context.props.room;

      var chatLogCopy = Object.assign({}, context.props.chatLog);
      console.log('check chatlog before', chatLogCopy);
      chatLogCopy[oldRoom] = context.props.chatLog[oldRoom] || context.props.currentChat;
      console.log('check chatlog after', chatLogCopy);

      context.props.dispatch(userActions.createRoom(room));

      console.log('checking joinroom success chatlog a bit later', context.props.chatLog);

      if(!chatLogCopy.hasOwnProperty(room)) {
        console.log('i hit the falsy value for hasOwnProperty');
        chatLogCopy[room] = [];
        context.props.dispatch(userActions.updateChatLog(chatLogCopy));
        console.log('checking chatLog --->', context.props.chatLog);
        context.props.dispatch(userActions.updateCurrentChat([]));

      } else {
        console.log('i hit the truthy value for hasOwnProperty');
        context.props.dispatch(userActions.updateChatLog(chatLogCopy));
        context.props.dispatch(userActions.updateCurrentChat(chatLogCopy[room]));
        console.log('checking chatLog --->', context.props.chatLog);
      }


    })
  }

  componentWillUnmount() {
    var socket = this.props.socket;
    var clearChat = [];


    this.props.dispatch(userActions.updateCurrentChat(clearChat));

    socket.removeAllListeners("joinRoomSuccess");
    socket.removeAllListeners("textmessagereceived");

    let myHeaders = new Headers({'Content-Type': 'application/graphql; charset=utf-8'});
    let options = {

      method: 'POST',
      headers: myHeaders,
      body: `
          mutation {
          updateUser(username: \"${this.props.user.username}\" coin:${this.props.user.coin})  {
            username
          }
          }
          `

    };
    fetch('/graphql', options).then((res) =>{
      return res.json().then((data) => {
        console.log('checking data after fetching', data);
      })
    })


    //PSEUDOCODE
    //loop through chatLog
    //fire off graphql query for every Room in chatLog
    //clear chatLog


  }

  handleWindowClose(){
      alert("Alerted Browser Close");
  }

  sendChat(message) {
    var updatedCoin = this.props.user.coin + this.state.currentFriend.score;
    var userCopy = Object.assign({},this.props.user, {coin: updatedCoin});
    this.props.dispatch(userActions.updateUser(userCopy));
    console.log('i am receiving a message', message);
    message = this.props.user.username+": "+message;
    this.props.socket.emit('textmessagesent', message, this.props.room);

  }




  render() {


    var context = this;
    var chat = context.props.currentChat.map((message) => <div className="oneChatMessage">{message}</div>);


    var chatInputWindow;
    if(this.state.chatSelected) {
      chatInputWindow = <div><div className="chatWindow">
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
    }

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
         {chatInputWindow} 
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
    chatLog: state.userReducer.chatLog,
    currentChat: state.userReducer.currentChat
  }
}

export default connect(mapStateToProps)(TextChatContainer);

// {this.props.friends.map((item, index) => <TextChat key={index} friend={item}/>)}