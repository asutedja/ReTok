import React from 'react'
import { Router, browserHistory } from 'react-router'
// import Signin from './Signin.js'


export default class LoginContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	signingIn(user, password) {
		console.log('User ',user, ' Password ', password);
		browserHistory.push('/me');
	}


	render() {

		return(
			<div>
			HIIII
			</div>
			)
	}
}