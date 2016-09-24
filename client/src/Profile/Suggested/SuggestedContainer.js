import React, { PropTypes }  from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import * as userActions from '../../Redux/userReducer'


class SuggestedContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log('i hit this component for recentfriends')
  }

  render() {
    return (
      <div>
        Good Morning
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


export default connect(mapStateToProps)(SuggestedContainer)