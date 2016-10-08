import React, { PropTypes }  from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import * as userActions from '../Redux/userReducer'
import OnlineFriends from '../Profile/OnlineFriends/OnlineFriends.js'
import friendTierCalculator from '../friendTierCalculator.js'
import updateHelper from '../updateHelper.js'
import EmojiChatContainer from '../TextChat/EmojiChatContainer/EmojiChatContainer.js'
import { Scrollbars } from 'react-custom-scrollbars';


class MultiChatContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    var socket = this.props.socket;
    socket.on('update',()=> updateHelper(this))
    updateHelper(this)
  }

  componentWillUnmount() {
    console.log('UNMOUNTING')
    connection = window.connection;
    connection.getAllParticipants().forEach(function(uid) {
        connection.disconnectWith( uid );
    });
    connection.attachStreams.forEach(function(selfStream) {
        selfStream.stop();
    });
  }

  

  componentDidMount() {
    var connection = new RTCMultiConnection();
    connection.videosContainer = document.getElementById('videosContainer');
    window.connection = connection;
    // connection.userid = this.props.user;
     connection.session = {
         audio: true,
         video: true,
         data: true
     };

     connection.sdpConstraints.mandatory = {
         OfferToReceiveAudio: true,
         OfferToReceiveVideo: true,
         OfferTOReceiveData: true
     };
     var socket = this.props.socket

     connection.socketMessageEvent = 'all-the-things';

     var room = this.props.room;
     var user = this.props.user.username;
     //Ensures caller opens the room first, before callees come in.
     connection.openOrJoin(room);

     document.getElementById('input-text-chat').onkeyup = function(e) {
      if (e.keyCode != 13) return;
      // removing trailing/leading whitespace
      this.value = this.value.replace(/^\s+|\s+$/g, '');
      if (!this.value.length) return;
      connection.getAllParticipants().forEach(function(uid) {
          connection.send(user + ': ' + this.value,uid);
      }.bind(this));
      appendDIV(user + ': ' + this.value);
      this.value = '';
     };
    

    var chatContainer = document.querySelector('.chat-output');
    
    var appendDIV = (event) => {
      if(typeof event.data === 'object') {
        console.log('Does this work?')
      }
      var div = document.createElement('div');
      div.innerHTML = event.data || event;
      chatContainer.insertBefore(div, chatContainer.firstChild);
      div.tabIndex = 0;
      div.focus();
      document.getElementById('input-text-chat').focus();
   }

    connection.onmessage = appendDIV;

    connection.onstream = function(event) {
      console.log('This is the event' , event);
      var name = this.props.user
      var width = parseInt(connection.videosContainer.clientWidth / 2) - 20;
      var mediaElement = getMediaElement(event.mediaElement, {
          title: name,
          buttons: ['full-screen'],
          width: width,
          showOnMouseEnter: false
      });
      connection.videosContainer.appendChild(mediaElement);
      setTimeout(function() {
          mediaElement.media.play();
      }, 5000);
      mediaElement.id = event.streamid;
      mediaElement.setAttribute('id', event.userid)
    }.bind(this);

    connection.onstreamended = function(event) {
      var mediaElement = document.getElementById(event.streamid);
      if(mediaElement) {
          mediaElement.parentNode.removeChild(mediaElement);
      }
    };

  

  }

  videoChat(friend) {
    console.log('i hit video chat for this friend', friend.username);

    var socket = this.props.socket;

    var info = {user: friend.username, caller: this.props.room}
    socket.emit('calling', info);

  } 

        // <div>
        // <Scrollbars style={{ height: 50 }}>
        //   <EmojiChatContainer/>
        // </Scrollbars>
        // </div>

  render() {
    return (
      <div id='webRTC'>
        <h1>Tok</h1>


        <div id='chatContainer'>
        <div id="file-container"></div>
    
        <div>
        <Scrollbars style={{ height: 100 }}>
            <div className="chat-output"></div>
        </Scrollbars>
        </div>
        </div>


        <input type="text" id="input-text-chat" placeholder="Enter Text Chat"/>

        <div id="videosContainer">
        </div>

        <div>
          {this.props.onlineFriends.map((item, index) => <OnlineFriends key={index} friend={item} videoChat={this.videoChat.bind(this)}/>)}
        </div>

      </div>
      )


  }

};

MultiChatContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user,
    room: state.userReducer.room,
    socket: state.userReducer.socket,
    onlineFriends: state.userReducer.onlineFriends
  }
}

export default connect(mapStateToProps)(MultiChatContainer);