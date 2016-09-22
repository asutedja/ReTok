import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import LoggedInNavContainer from '../Nav/LoggedInNav/LoggedInNavContainer'

class HomeContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			<LoggedInNavContainer/>
			</div>
		)
	}
} 

export default HomeContainer