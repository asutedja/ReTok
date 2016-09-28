import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

const Search = (props) => {
  //inline CSS-style. fills the entire AllFriends div with photo
    const divStyle = {
      backgroundImage: 'url(' +props.friend.profilePic+ ')',
      backgroundPosition:'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }
  return(
      <div className = "oneFriend" style={divStyle}>
        <button className="AddFriend" onClick={(e)=>{e.preventDefault;props.addFriend(props.friend);}}>Add Friend</button>
        <span>{props.friend.firstName}</span>
        <span>{props.friend.lastName}</span>
        <span>{props.friend.username}</span>
          <div className="oneFriendWrapper">
          </div>
      </div>
    )
}

export default Search