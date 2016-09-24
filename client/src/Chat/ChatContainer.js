import React from 'react'
import { render } from 'react-dom'

export default class ChatContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			vid: null
		}
	}

	componentWillMount() {
		navigator.getUserMedia = navigator.getUserMedia ||
		    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

		var constraints = {
		  audio: false,
		  video: true
		}
		var video = document.querySelector('video');		
		navigator.getUserMedia(constraints, this.successCallback, this.errorCallback);
	}
	

	successCallback(stream) {
		var video = document.querySelector('video');		
		window.stream = stream// stream available to console
	  if (window.URL) {
	    video.src = window.URL.createObjectURL(stream);
	  } else {
	    video.src = stream;
	  }
	}

	errorCallback(error) {
	  console.log('navigator.getUserMedia error: ', error);
	}

	componentWillUnmount() {
		var track = stream.getTracks()[0];
		track.stop();

	createPeerConnection() {
	  try {
	    pc = new RTCPeerConnection(null);
	    pc.onicecandidate = handleIceCandidate;
	    pc.onaddstream = handleRemoteStreamAdded;
	    pc.onremovestream = handleRemoteStreamRemoved;
	    console.log('Created RTCPeerConnnection');
	  } catch (e) {
	    console.log('Failed to create PeerConnection, exception: ' + e.message);
	    alert('Cannot create RTCPeerConnection object.');
	    return;
	  }
	}

	handleIceCandidate(event) {
	  console.log('icecandidate event: ', event);
	  if (event.candidate) {
	    sendMessage({
	      type: 'candidate',
	      label: event.candidate.sdpMLineIndex,
	      id: event.candidate.sdpMid,
	      candidate: event.candidate.candidate
	    });
	  } else {
	    console.log('End of candidates.');
	  }
	}

	handleRemoteStreamAdded(event) {
	  console.log('Remote stream added.');
	  remoteVideo.src = window.URL.createObjectURL(event.stream);
	  remoteStream = event.stream;
	}

	handleCreateOfferError(event) {
	  console.log('createOffer() error: ', event);
	}

	doCall() {
	  console.log('Sending offer to peer');
	  pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
	}

	doAnswer() {
	  console.log('Sending answer to peer.');
	  pc.createAnswer().then(
	    setLocalAndSendMessage,
	    onCreateSessionDescriptionError
	  );
	}

	setLocalAndSendMessage(sessionDescription) {
	  // Set Opus as the preferred codec in SDP if Opus is present.
	  //  sessionDescription.sdp = preferOpus(sessionDescription.sdp);
	  pc.setLocalDescription(sessionDescription);
	  console.log('setLocalAndSendMessage sending message', sessionDescription);
	  sendMessage(sessionDescription);
	}

	onCreateSessionDescriptionError(error) {
	  trace('Failed to create session description: ' + error.toString());
	}

	requestTurn(turnURL) {
	  var turnExists = false;
	  for (var i in pcConfig.iceServers) {
	    if (pcConfig.iceServers[i].url.substr(0, 5) === 'turn:') {
	      turnExists = true;
	      turnReady = true;
	      break;
	    }
	  }
	  if (!turnExists) {
	    console.log('Getting TURN server from ', turnURL);
	    // No TURN server. Get one from computeengineondemand.appspot.com:
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function() {
	      if (xhr.readyState === 4 && xhr.status === 200) {
	        var turnServer = JSON.parse(xhr.responseText);
	        console.log('Got TURN server: ', turnServer);
	        pcConfig.iceServers.push({
	          'url': 'turn:' + turnServer.username + '@' + turnServer.turn,
	          'credential': turnServer.password
	        });
	        turnReady = true;
	      }
	    };
	    xhr.open('GET', turnURL, true);
	    xhr.send();
	  }
	}

	handleRemoteStreamAdded(event) {
	  console.log('Remote stream added.');
	  remoteVideo.src = window.URL.createObjectURL(event.stream);
	  remoteStream = event.stream;
	}

	handleRemoteStreamRemoved(event) {
	  console.log('Remote stream removed. Event: ', event);
	}

	hangup() {
	  console.log('Hanging up.');
	  stop();
	  sendMessage('bye');
	}

	handleRemoteHangup() {
	  console.log('Session terminated.');
	  stop();
	  isInitiator = false;
	}

	stop() {
	  isStarted = false;
	  // isAudioMuted = false;
	  // isVideoMuted = false;
	  pc.close();
	  pc = null;
	}


	

	render() {
		return (
			<div id='videos'>
				 <video id="video" autoPlay></video>
				 <video id="videoRemote" autoPlay></video>

				 <button id="startButton">Start</button>
				 <button id="callButton">Call</button>
				 <button id="hangupButton">Hang Up</button>

			</div>
			)
	}
}