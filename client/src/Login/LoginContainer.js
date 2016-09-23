import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import SignUpForm from './SignUpForm.js'


export default class LoginContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	signUp(user, password) {
		console.log('User ',user, ' Password ', password);

	}


	render() {

		return(
			<div>
				<SignUpForm signUp={this.signUp.bind(this)}/>
			</div>
			)
	}
}