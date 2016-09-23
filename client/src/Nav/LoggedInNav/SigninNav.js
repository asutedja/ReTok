import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

export const SignInNav = (props) => (
	<div>
		<form onSubmit={(e) => props.signingIn(e,document.getElementById('user').value, document.getElementById('password').value)}>
			Sign In Here
			<input id='user' type='text' placeholder='Username'/>
			<input id='password' type='text' placeholder='Password'/>
			<input type='submit' value='Sign In'/>
		</form>
	</div>
	)
export default SignInNav;