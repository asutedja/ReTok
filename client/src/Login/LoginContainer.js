import React from 'react'
import { Router, browserHistory } from 'react-router'
// import Signin from './Signin.js'


export default class LoginContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	signingIn(user, password) {
		console.log('User ',user, ' Password ', password);

	 let myHeaders = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    let options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({user: user, password: password})
    };
		//Create logic for checking user and password
		fetch('/login', options).then(function() {
			console.log('sent')
		})

		//when we see confirmation of user, move user to their profile page
		//browserHistory.push('/' + user);
	}

	signUp(user, password) {
		console.log('User ',user, ' Password ', password);

	}


	render() {

		return(
			<div>
				<Signin signingIn={this.signingIn.bind(this)} />
				<div>
				</div>
			</div>
			)
	}
}