import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import io from 'socket.io-client'
import axios from 'axios'
import TextChatProfile from './TextChatProfile.js'
import * as userActions from '../../Redux/userReducer'

class TextChatProfileContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatSelected: false,
      currentFriend: null,
      newChatHistoryLog: {} 
    }
  }

  render() {

    return (
      <div>
        <TextChatProfile user={this.props.user} userEmojis={this.props.userEmojis}/>
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

export default connect(mapStateToProps)(TextChatProfileContainer);
