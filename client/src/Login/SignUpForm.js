import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router'

export const SignUpForm = (props) => (
	<div>
		<form onSubmit={props.signUp(document.getElementById('user').value, document.getElementById('password').value)}>
			Sign Up Here
			<input id='user' type='text' placeholder='Username'/>
			<input id='password' type='text' placeholder='Password'/>
		</form>
	</div>
	)
export default SignUpForm;