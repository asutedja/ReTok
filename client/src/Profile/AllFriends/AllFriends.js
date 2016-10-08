import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

const AllFriends = (props) => {
  //inline CSS-style. fills the entire AllFriends div with photo
    const divStyle = {
      backgroundImage: 'url(' +props.friend.profilePic+ ')',
      backgroundPosition:'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',

    }
  return(
      <div className = "oneFriend" style={divStyle}>
          <div className="oneFriendWrapper">
          </div>
          <p style={{'color': 'black', 'position': 'absolute', 'zAxis': -1}}>{props.friend.username}</p>
      </div>
    )
}

export default AllFriends