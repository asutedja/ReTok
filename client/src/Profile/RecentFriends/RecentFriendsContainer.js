import React, { PropTypes }  from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import * as userActions from '../../Redux/userReducer'


class RecentFriendsContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log('i hit this component for recentfriends')
  }

  render() {
    return (
      <div>
        Bye World
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


export default connect(mapStateToProps)(RecentFriendsContainer)