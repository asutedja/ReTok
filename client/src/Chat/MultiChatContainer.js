import React, { PropTypes }  from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import * as userActions from '../Redux/userReducer'

class MultiChatContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillUnmount() {
    console.log('UNMOUNTING')
    window.connection.attachStreams.forEach(function(stream) {
        stream.stop();
    });
    window.connection.leave();
    window.connection.closeEntireSession();
    var info = {name:this.props.user, room:this.props.room};
    //Tell server to remove callees from socket room
    this.props.socket.emit('leavingVideo', info);
    window.connection.close();
    window.connection = null;
  }

  componentDidMount() {

    var connection = new RTCMultiConnection();
    window.connection = connection;
    // connection.userid = this.props.user;
     connection.session = {
         audio: true,
         video: true,
         data: true
     };

     connection.sdpConstraints.mandatory = {
         OfferToReceiveAudio: true,
         OfferToReceiveVideo: true
     };
     var socket = this.props.socket


     var room = this.props.room;
     //Ensures caller opens the room first, before callees come in.
     connecttion.openOrJoin(room);

      document.getElementById('input-text-chat').onkeyup = function(e) {
        if (e.keyCode != 13) return;
        // removing trailing/leading whitespace
        this.value = this.value.replace(/^\s+|\s+$/g, '');
        if (!this.value.length) return;
        connection.send(this.value);
        appendDIV(this.value);
        this.value = '';
    };
    
    var chatContainer = document.querySelector('.chat-output');
    
    function appendDIV(event) {
        var div = document.createElement('div');
        div.innerHTML = event.data || event;
        chatContainer.insertBefore(div, chatContainer.firstChild);
        div.tabIndex = 0;
        div.focus();
        document.getElementById('input-text-chat').focus();
    }

     connection.onstream = function(event) {
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
      }.bind(this);

      connection.onstreamended = function(event) {
          var mediaElement = document.getElementById(event.streamid);
          if(mediaElement) {
              mediaElement.parentNode.removeChild(mediaElement);
          }
          connection.closeEntireSession();
      };

      connection.onEntireSessionClosed = function(event) {
          connection.leave();
          connection.attachStreams.forEach(function(stream) {
              stream.stop();
          });
          var info = {name:this.props.user, room:this.props.room};
          this.props.socket.emit('leavingVideo', info);
          console.log('Connection should be closed!')
          this.context.router.push('/profile')
      }.bind(this);

    }


  render() {
    return (
      <div id='webRTC'>
        <h1>Tok</h1>

        <div id="videosContainer">
        </div>

        <div id='chatContainer'>
        <div className="chat-output"></div>
        </div>
        <input type="text" id="input-text-chat" placeholder="Enter Text Chat"/>
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
    connection: state.userReducer.connection
  }
}

export default connect(mapStateToProps)(MultiChatContainer);