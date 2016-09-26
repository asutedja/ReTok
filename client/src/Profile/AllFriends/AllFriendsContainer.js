import React, { PropTypes }  from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import * as userActions from '../../Redux/userReducer'
import AllFriends from './AllFriends.js'


class AllFriendsContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log('i hit all friends container', this.props.friends);
  }

  render() {
    console.log('what is my props', this.props.friends);
    return (
      <div className= "AllFriendsContainer">
      {this.props.friends.map((item, index) => <AllFriends key={index} friend={item}/>)}
      </div>
      )
  }
}


function mapStateToProps(state) {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    user: state.userReducer.user,
    friends: state.userReducer.friends
  }
}



export default connect(mapStateToProps)(AllFriendsContainer)

// export default AllFriendsContainer