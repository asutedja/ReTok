import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

const FriendsListEntry = (props) => {

  return (
    <div onClick={(e)=>{e.preventDefault(); props.joinRoom(props.friend); props.addHighlightClass(props.friend.username)}} className= "chatFriendsListEntry" id={props.friend.username}>
    <span>{props.friend.username}</span>
    <button className="videoChatBtn" onClick={(e)=>{e.preventDefault();props.videoChat(props.friend)}}>
    </button>
    </div>
  )
}


export default FriendsListEntry