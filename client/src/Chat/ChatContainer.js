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
	  stream.stop();
	}

	errorCallback(error) {
	  console.log('navigator.getUserMedia error: ', error);
	}

	componentWillUnmount() {

	}

	

	render() {
		return (
			<div id='videos'>
				 <video id="video" autoPlay></video>

			</div>
			)
	}
}