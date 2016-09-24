import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
import Profile from './Profile.js'
import * as userActions from '../Redux/userReducer'

// 	componentWillMount() {
// 		//Variable to hold value for session status for user
// 		//Will require a query to server for status on server
// 		var session = false;
// 		if(!session) {
// 			browserHistory.push('/login')	
// 		}
// 	}


// }
class ProfileContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log('checking my props', this.props);
  }

  render() {
    return (
      <div>
        <Profile/>
        {this.props.children}
      </div>
    )
  }
}

//testing1234
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
// export default ProfileContainer