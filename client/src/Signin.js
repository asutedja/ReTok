import React from 'react'
import { render } from 'react-dom'

export const Signin = (props) => (
	<div>
		<form onSubmit={() => props.signingIn(document.getElementById('user').value, document.getElementById('password').value)}>
			<input id='user' type='text' placeholder='Username'/>
			<input id='password' type='text' placeholder='Password'/>
		</form>
	</div>
	)
export default Signin;