import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import io from 'socket.io-client'
import axios from 'axios'
import * as userActions from '../../Redux/userReducer'
import ChatWindow from './ChatWindow'
import shortToUnicode from '../../../shortToUnicode.js'
import unicodeToShort from '../../../unicodeToShort.js'

class ChatWindowContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatSelected: false,
      currentFriend: null,
      newChatHistoryLog: {} 
    }
  }

  componentWillMount() {
    console.log('hit ChatWindowContainer -> =P');
  }

  render() {

    return (
      <div>
        <ChatWindow chatLog={this.props.chatLog} currentChat={this.props.currentChat}/>
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
    currentChat: state.userReducer.currentChat,
    userEmojis: state.userReducer.userEmojis
  }
}

export default connect(mapStateToProps)(ChatWindowContainer);
