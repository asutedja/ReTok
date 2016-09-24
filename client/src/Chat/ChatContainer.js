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

getName(pc) {
  return (pc === pc1) ? 'pc1' : 'pc2';
}

getOtherPc(pc) {
  return (pc === pc1) ? pc2 : pc1;
}

gotStream(stream) {
  trace('Received local stream');
  localVideo.srcObject = stream;
  // Add localStream to global scope so it's accessible from the browser console
  window.localStream = localStream = stream;
  callButton.disabled = false;
}

start() {
  trace('Requesting local stream');
  startButton.disabled = true;
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  })
  .then(gotStream)
  .catch(function(e) {
    alert('getUserMedia() error: ' + e.name);
  });
}

call() {
  callButton.disabled = true;
  hangupButton.disabled = false;
  trace('Starting call');
  startTime = window.performance.now();
  var videoTracks = localStream.getVideoTracks();
  var audioTracks = localStream.getAudioTracks();
  if (videoTracks.length > 0) {
    trace('Using video device: ' + videoTracks[0].label);
  }
  if (audioTracks.length > 0) {
    trace('Using audio device: ' + audioTracks[0].label);
  }
  var servers = null;
  // Add pc1 to global scope so it's accessible from the browser console
  window.pc1 = pc1 = new RTCPeerConnection(servers);
  trace('Created local peer connection object pc1');
  pc1.onicecandidate = function(e) {
    onIceCandidate(pc1, e);
  };
  // Add pc2 to global scope so it's accessible from the browser console
  window.pc2 = pc2 = new RTCPeerConnection(servers);
  trace('Created remote peer connection object pc2');
  pc2.onicecandidate = function(e) {
    onIceCandidate(pc2, e);
  };
  pc1.oniceconnectionstatechange = function(e) {
    onIceStateChange(pc1, e);
  };
  pc2.oniceconnectionstatechange = function(e) {
    onIceStateChange(pc2, e);
  };
  pc2.onaddstream = gotRemoteStream;

  pc1.addStream(localStream);
  trace('Added local stream to pc1');

  trace('pc1 createOffer start');
  pc1.createOffer(
    offerOptions
  ).then(
    onCreateOfferSuccess,
    onCreateSessionDescriptionError
  );
}

onCreateSessionDescriptionError(error) {
  trace('Failed to create session description: ' + error.toString());
}

onCreateOfferSuccess(desc) {
  trace('Offer from pc1\n' + desc.sdp);
  trace('pc1 setLocalDescription start');
  pc1.setLocalDescription(desc).then(
    function() {
      onSetLocalSuccess(pc1);
    },
    onSetSessionDescriptionError
  );
  trace('pc2 setRemoteDescription start');
  pc2.setRemoteDescription(desc).then(
    function() {
      onSetRemoteSuccess(pc2);
    },
    onSetSessionDescriptionError
  );
  trace('pc2 createAnswer start');
  // Since the 'remote' side has no media stream we need
  // to pass in the right constraints in order for it to
  // accept the incoming offer of audio and video.
  pc2.createAnswer().then(
    onCreateAnswerSuccess,
    onCreateSessionDescriptionError
  );
}

onSetLocalSuccess(pc) {
  trace(getName(pc) + ' setLocalDescription complete');
}

onSetRemoteSuccess(pc) {
  trace(getName(pc) + ' setRemoteDescription complete');
}

onSetSessionDescriptionError(error) {
  trace('Failed to set session description: ' + error.toString());
}

gotRemoteStream(e) {
  // Add remoteStream to global scope so it's accessible from the browser console
  window.remoteStream = remoteVideo.srcObject = e.stream;
  trace('pc2 received remote stream');
}

onCreateAnswerSuccess(desc) {
  trace('Answer from pc2:\n' + desc.sdp);
  trace('pc2 setLocalDescription start');
  pc2.setLocalDescription(desc).then(
    function() {
      onSetLocalSuccess(pc2);
    },
    onSetSessionDescriptionError
  );
  trace('pc1 setRemoteDescription start');
  pc1.setRemoteDescription(desc).then(
    function() {
      onSetRemoteSuccess(pc1);
    },
    onSetSessionDescriptionError
  );
}

onIceCandidate(pc, event) {
  if (event.candidate) {
    getOtherPc(pc).addIceCandidate(
      new RTCIceCandidate(event.candidate)
    ).then(
      function() {
        onAddIceCandidateSuccess(pc);
      },
      function(err) {
        onAddIceCandidateError(pc, err);
      }
    );
    trace(getName(pc) + ' ICE candidate: \n' + event.candidate.candidate);
  }
}

onAddIceCandidateSuccess(pc) {
  trace(getName(pc) + ' addIceCandidate success');
}

onAddIceCandidateError(pc, error) {
  trace(getName(pc) + ' failed to add ICE Candidate: ' + error.toString());
}

onIceStateChange(pc, event) {
  if (pc) {
    trace(getName(pc) + ' ICE state: ' + pc.iceConnectionState);
    console.log('ICE state change event: ', event);
  }
}

hangup() {
  trace('Ending call');
  pc1.close();
  pc2.close();
  pc1 = null;
  pc2 = null;
  hangupButton.disabled = true;
  callButton.disabled = false;
}


trace(text) {
  if (text[text.length - 1] === '\n') {
    text = text.substring(0, text.length - 1);
  }
  if (window.performance) {
    var now = (window.performance.now() / 1000).toFixed(3);
    console.log(now + ': ' + text);
  } else {
    console.log(text);
  }
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