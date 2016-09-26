import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router'

const SignUpForm = (props) => (
	<div>
		<form type='submit' onSubmit={(e) => props.signUp(e,document.getElementById('newUser').value, document.getElementById('newPassword').value)}>
			Sign Up Here
			<input id='newUser' type='type/submit' placeholder='Username'/>
			<input id='newPassword' type='type/submit' placeholder='Password' />
			<input type='submit' value='Sign Up!'/>
		</form>
	</div>
)

export default SignUpForm;