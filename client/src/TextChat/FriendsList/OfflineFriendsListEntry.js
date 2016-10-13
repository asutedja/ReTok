import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

const OfflineFriendsListEntry = (props) => {

  const divStyle = {
    backgroundImage: 'url(' +props.friend.profilePic+ ')',
    backgroundPosition:'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',

  }

  return (


    <div className= "chatFriendsListEntry" id={props.friend.username} onClick={(e)=>{e.preventDefault(); props.joinRoom(props.friend); props.addHighlightClass(props.friend.username)}}>
    <div className = "oneFriendChatImage" style={divStyle}>
        <div className="oneFriendChatImageWrapper">
        </div>
    </div>
    <span>{props.friend.username}</span>
    </div>

  )
}


export default OfflineFriendsListEntry