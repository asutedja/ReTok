import React from 'react'
import { render } from 'react-dom'

class ChatContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  	console.log('I get here')

    var isChannelReady = false;
    var isInitiator = false;
    var isStarted = false;
    var localStream;
    var pc;
    var remoteStream;
    var turnReady;

    var pcConfig = {
      'iceServers': [{
        'url': 'stun:stun.l.google.com:19302'
      }]
    };


    // Set up audio and video regardless of what devices are present.
    var sdpConstraints = {
      'mandatory': {
        'OfferToReceiveAudio': true,
        'OfferToReceiveVideo': true
      }
    };

   
    var socket = io();


    var localVideo = document.querySelector('#localVideo');
    var remoteVideo = document.querySelector('#remoteVideo');

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
    .then(this.gotStream.bind(this))
    .catch(function(e) {
      alert('getUserMedia() error: ' + e.name);
    });


    // if (location.hostname !== 'localhost') {
    //   this.requestTurn(
    //     'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
    //   );
    // }

    var room = 'foo';
    // Could prompt for room name:
    // room = prompt('Enter room name:');


    if (room !== '') {
      socket.emit('create or join', room);
      console.log('Attempted to create or  join room', room);
    }

    socket.on('created', function(room) {
      console.log('Created room ' + room);
      isInitiator = true;
    });

    socket.on('full', function(room) {
      console.log('Room ' + room + ' is full');
    });

    socket.on('join', function (room){
      console.log('Another peer made a request to join room ' + room);
      console.log('This peer is the initiator of room ' + room + '!');
      isChannelReady = true;
    });

    socket.on('joined', function(room) {
      console.log('joined: ' + room);
      isChannelReady = true;
    });

    socket.on('log', function(array) {
      console.log.apply(console, array);
    });


    // This client receives a message
    socket.on('message', function(message) {
      console.log('Client received message:', message);
      if (message === 'got user media') {
        this.maybeStart();
      } else if (message.type === 'offer') {
        if (!isInitiator && !isStarted) {
          this.maybeStart();
        }
        pc.setRemoteDescription(new RTCSessionDescription(message));
        this.doAnswer();
      } else if (message.type === 'answer' && isStarted) {
        pc.setRemoteDescription(new RTCSessionDescription(message));
      } else if (message.type === 'candidate' && isStarted) {
        var candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        pc.addIceCandidate(candidate);
      } else if (message === 'bye' && isStarted) {
        this.handleRemoteHangup();
      }
    });

  }

	render() {
		return (
      <div id="videos">
        <video id="localVideo" autoPlay></video>
        <video id="remoteVideo" autoPlay></video>
      </div>
    )
  }
}

export default ChatContainer;
