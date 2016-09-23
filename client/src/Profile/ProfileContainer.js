import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router'

export default class ProfileContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		//Variable to hold value for session status for user
		//Will require a query to server for status on server
		var session = false;
		if(!session) {
			browserHistory.push('/login')	
		}
	}

	render() {
		return (
			<div>
				Profile
			</div>
			)
	}
}