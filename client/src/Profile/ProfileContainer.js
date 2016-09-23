import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
import * as userActions from '../Redux/userReducer'

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
class ProfileContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
      )
  }
}


function mapStateToProps(state) {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user
  }
}

ProfileContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(ProfileContainer)
